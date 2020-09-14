import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ValueTransformer } from '@angular/compiler/src/util';
@Component({
  selector: 'app-task-comp',
  templateUrl: './task-comp.component.html',
  styleUrls: ['./task-comp.component.css']
})
export class TaskCompComponent implements OnInit 
{
  // Tabel Array For Fetch Data From DB
  data =[];
  // Product any for fetch from API
  product: any;

  // Submitted is false for the data retriving 
  submitted = false;
  Updated = false;
  // oppoSuits is a veribale for gender dropbox
  oppoSuits: any = ['Men', 'Women']

  genderlist: any = ['Men', 'Women']
  // selectdItemList is for checkbox and information
  selectedcheckbox: any = [];
  isHidden: boolean = true;
  Updatedcheckbox:any =[];

  form: FormGroup;
  Update:FormGroup;
  HobbieList: any = [
      { key: 'Eat', value: 'Eat' },
      { key: 'Sleep', value: 'Sleep' },
      { key: 'Code', value: 'Code' },
      {key: 'Repeat', value:'Repeat'}
    ];
    
  
  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^$|^[A-Za-z0-9]+")]],
      lastName: ['', [Validators.required, Validators.pattern("^$|^[A-Za-z0-9]+")]],
      phone:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      gender:['',Validators.required],
     hobbies: [false, Validators.requiredTrue]
    //  hobbies: this.formBuilder.array([], [Validators.required])
    })
    this.Update = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^$|^[A-Za-z0-9]+")]],
      lastName: ['', [Validators.required, Validators.pattern("^$|^[A-Za-z0-9]+")]],
      phone:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      gender:['',Validators.required],
      hobbies: ['', Validators.requiredTrue]
    //  hobbies: this.formBuilder.array([], [Validators.required])
    })
    this.getProducts();
  }
   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }
   get fu() { return this.Update.controls; }

   posts: any;

  onCheckboxChange(event) 
  {
    let index = this.selectedcheckbox.indexOf(event.target.value);
    if(index == -1)
    {
      this.selectedcheckbox.push(event.target.value);
    }
    else
    {
      this.selectedcheckbox.splice(index,1);
    }
  }
  onUpdatecheckbox(event) 
  {
    let index = this.Updatedcheckbox.indexOf(event.target.value);
    if(index == -1)
    {
      this.Updatedcheckbox.push(event.target.value);
    }
    else
    {
      this.Updatedcheckbox.splice(index,1);
    }
  }
  
   onSubmit()
   {
      this.submitted = true;
      // console.log(this.form.value);
      // stop here if form is invalid
      if (this.form.invalid) 
      {return;}
    // console.log(this.form.value.hobbies);
    
    let Params = new HttpParams();
    // Begin assigning parameters
    this.form.value.hobbies = this.selectedcheckbox.toString();
  
    Params = Params.append('firstParameter', this.form.value.firstName);
    Params = Params.append('secondParameter', this.form.value.lastName);
    Params = Params.append('thirdParameter', this.form.value.phone);
    Params = Params.append('fourthParameter', this.form.value.gender);
    Params = Params.append('fifthParameter', this.form.value.hobbies);
    return this.http.post('http://192.168.1.94:8000/api/adduserdetails'
    ,
    {
      params: { params: Params }
      }).subscribe((res: Response) => {
        alert(res);
        window.location.reload()
      }) 
      // Put Data
      
    }

  onReset() 
  {
    this.submitted = false;
    this.form.reset();

  }
  onupdatereset(){
    location.reload()
  }

  getProducts() 
  {
    return  this.http.get('http://192.168.1.94:8000/api/getdata').subscribe(data => {
          this.data.push(data);  
          }, error => console.error(error));
  }
  
  ngOnInit(): void {}

  deleteProduct(id:any) 
  {
    // console.log('Delete Product id ' + id);
    this.http.delete('http://192.168.1.94:8000/api/product/' + id).subscribe(res => {
       alert('Deleted and refresh Table');
       window.location.reload()
       this.data.push(res); 
    }, err => {
        console.log('Error occured');
    });
  }
  
  showProduct(id:any) 
  {
    this.isHidden = false;
    // console.log('Get id ' + id);
    return this.http.get('http://192.168.1.94:8000/api/product/' + id).subscribe(data => {
        this.product = data;
        this.Update.patchValue({ 
          firstName: this.product.firstName,
          lastName: this.product.lastName,
          phone: this.product.phone,
          gender: this.product.gender,
          hobbies:false
        // hobbies:  
        });
        this.Updatedcheckbox = this.product.hobbies.split(",");
        // console.log(this.selectedcheckbox);
      });
  }
  userdata(){
    
  }

  putProduct(id:any) 
  {
  
    this.Updated = true;
    // console.log(this.form.value);
    // stop here if form is invalid
    if (this.Update.invalid) 
    {return;}

     console.log('Update Product id ' + id);
    this.Update.value.hobbies = this.Updatedcheckbox.toString();

    this.http.put('http://192.168.1.94:8000/api/product/' + id, this.Update.value).subscribe(res => {
        alert('Record Updated :)');
        this.getProducts();
        window.location.reload();

    }, err => {
        // console.log('Error occured');
    });

  }

}
