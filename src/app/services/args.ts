import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Args {
  scanner_args = ""

  setScannerArgs(args:string){
    this.scanner_args = args
  }

  getScannerArgs(){
    return this.scanner_args;
  }
}
