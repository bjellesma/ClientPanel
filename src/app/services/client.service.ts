import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Client} from '../models/Client'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;


  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => {
      return ref.orderBy('lastName', 'asc')
    })


  }
  //get the current state of the collection in firebase
  //https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md
  getClients():Observable<Client[]>{
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Client
        data.id = a.payload.doc.id
        return data
      }))
    )

    return this.clients
  }

  addClient(client: Client){
    this.clientsCollection.add(client)
  }

  getClient(id: string): Observable<Client>{
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`)
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false){
          return null
        }else{
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data
        }
      }
    ));
    return this.client
  }

  updateClient(client: Client): void{
    this.clientDoc = this.afs.doc(`clients/${client.id}`)
    this.clientDoc.update(client)
  }

  deleteClient(client: Client): void{
    this.clientDoc = this.afs.doc(`clients/${client.id}`)
    // we dont need to pass anything to firebase since we are performing a delete on the client
    this.clientDoc.delete()
  }
}
