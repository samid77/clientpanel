import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../models/Client';
import { getInheritedFactory } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsColletion: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsColletion = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
    /** Get clients with the id */
    this.clients = this.clientsColletion.snapshotChanges().pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.clients;
  }
}
