import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Args {
  scanner_args = ""
  event_data = {}

  setEventData(data:any){
    this.event_data = data
  }

  getEventData(){
    return this.event_data;
  }

  setScannerArgs(args:string){
    this.scanner_args = args
  }

  getScannerArgs(){
    return this.scanner_args;
  }
}
