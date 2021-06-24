import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'https://truyouapi.herokuapp.com';
    private socket;

  constructor() {
    this.socket = io(this.url);
   }

   public sendMessage(data){
     console.log('Service sendMessages called', data)
     this.socket.emit('new-message', data);
  }

  joinRoom(data)
    {
      console.log('Joinroom', data.user, data.room);
      this.socket.emit('join', data.user, data.room);
    }

    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    public getMessages = () => {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('goMessage', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

}
