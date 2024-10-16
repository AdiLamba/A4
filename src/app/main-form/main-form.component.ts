import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDatum } from '../myInterfaces/FormDataInterface';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.css',
  providers: [DatePipe]
})
export class MainFormComponent {

  constructor (private httpInstance: HttpClient,
               private fb: FormBuilder,
               private datePipe: DatePipe){}

  formGroup !: FormGroup;
  localFormData !: FormDatum;
  sizes: {size: string}[] = [];
  colors: string[] = ['Sheridan Blue', 'Sheridan Orange', 'Black'];
  //output: string | null = null;

  localDataFetch(){

    const url = '/assets/data/A4Form.json';

    this.httpInstance.get(url).subscribe((res: any)=>{
      console.log(this.localFormData);

      this.localFormData = res.controlDefaults;
      this.sizes = res.shirtSizes;

      this.formGroup.patchValue({
        controlID: this.localFormData.controlID,
        controlFirst: this.localFormData.controlFirst,
        controlLast: this.localFormData.controlLast,
        controlSize: this.localFormData.controlSize,
        controlColour: this.localFormData.controlColour,
        startDate: new Date()
      });
    });

  }

  ngOnInit(){
    this.formGroup = this.fb.group({
      controlID: ['', Validators.required],
      controlFirst: ['', Validators.required],
      controlLast: ['', Validators.required],
      controlSize: ['', Validators.required],
      controlColour: ['', Validators.required],
      campusName: [false],
      sheridanLogo: [false],
      startDate: ['', Validators.required]
    });
    
    this.localDataFetch();
  }


  onSubmit() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      let inclusions = `${formValue.campusName ? 'Name added ' : ''}${formValue.sheridanLogo ? 'Logo added' : ''}`;
      if (!formValue.campusName && !formValue.sheridanLogo) {
        inclusions = 'No inclusions';
      }
      const formattedDate = this.datePipe.transform(formValue.startDate, 'fullDate');
      const output = `${formValue.controlID} / ${formValue.controlFirst} ${formValue.controlLast}
      Order: ${formValue.controlSize} size, in ${formValue.controlColour} colour
      Inclusions: ${inclusions}
      Ordered On: ${formattedDate}`;
      const outputElement = document.querySelector('#output') as HTMLTextAreaElement;
      if (outputElement) {
        outputElement.innerText = output;
      }
    } else {
      const outputElement = document.querySelector('#output') as HTMLTextAreaElement;
      if (outputElement) {
        outputElement.innerText = 'Please fill out all required fields.';
      }
    }
  }
}
