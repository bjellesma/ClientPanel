import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service'
import {Client} from '../../models/Client'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[]
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients
      //getTotalOwed method will get all of the balances and put it into the totalOwed property
      this.getTotalOwed();
    })
  }

  getTotalOwed(){
    // Array Reduce is a higher order array method that will act as a for look and output the final value
    // here 0 is the initial value for total
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString())
    }, 0)
  }

}
