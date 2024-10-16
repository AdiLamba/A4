import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormDatum } from '../myInterfaces/FormDataInterface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor (private httpInstance: HttpClient){}

  localFormData !: FormDatum;

  localDataFetch(){

    const url = '/assets/data/A4Form.json';

    this.httpInstance.get(url).subscribe((res: any)=>{
      console.log(this.localFormData);

      this.localFormData = res.controlDefaults;
    })

  }

  ngOnInit(){
    this.localDataFetch();
  }

}
