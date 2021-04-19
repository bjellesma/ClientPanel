import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Client} from '../../models/Client'
import {ClientService} from '../../services/client.service'
import {FlashMessagesService} from 'angular2-flash-messages'

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    // get id from url
    this.id = this.route.snapshot.params['id']
    //get client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client !== null){
        if(client.balance > 0){
          this.hasBalance = true;
        }
        this.client = client
      }
      
    })
  }
  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.clientService.deleteClient(this.client)
      this._flashMessagesService.show('Client successfully deleted',{
        cssClass: 'alert-success', timeout: 4000
      })
      this.router.navigate(['/'])
    }
  }
  updateBalance(){
    if(isNaN(this.client.balance)){
      return 
    }
    this.clientService.updateClient(this.client)
    this._flashMessagesService.show('Balance Updated', {
      cssClass: 'alert-success', timeout: 4000
    })
    this.showBalanceUpdateInput = false;
  }
}
