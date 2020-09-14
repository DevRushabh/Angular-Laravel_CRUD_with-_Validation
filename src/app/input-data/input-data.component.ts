import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {

  constructor() { }
  firstName: string = "Rushabh";
  lastName:string = "Thakar";
  // 2 Way Binding 
  name:string;
  myFunction(): void { 
    alert('Show alert!'); 
  } 
  ngOnInit(): void {
  }

}
