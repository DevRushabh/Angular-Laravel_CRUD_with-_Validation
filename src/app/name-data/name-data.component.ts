import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
 import { StoreDataServiceService } from '../services/store-data-service.service';
@Component({
  selector: 'app-name-data',
  templateUrl: './name-data.component.html',
  styleUrls: ['./name-data.component.css']
})
export class NameDataComponent implements OnInit {
// Fetch Array ;
data= [];
// For Resources 
product: any;
// Submitted is false for the data retriving 
  submitted = false;
  // oppoSuits is a veribale for gender dropbox
  oppoSuits: any = ['Men', 'Women']
  // selectdItemList is for checkbox and information
  selectedItemsList = [];

  checkedIDs = [];
  // CheckboxesDataList array for addind the options
  checkboxesDataList = [
    {
      id: 'C001',
      label: 'Photography',
      isChecked: false
    },
    {
      id: 'C002',
      label: 'Code',
      isChecked: false
      
    },{
      id: 'C003',
      label: 'Painting',
      isChecked: false
    },]
  
  constructor(private fb: FormBuilder, private http: HttpClient) { 
    this.getProducts();
  }

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
    lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
    phone:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
    gender:['',Validators.required],
    hobbies:['',Validators.required],
  })
   // convenience getter for easy access to form fields
   get f() { return this.profileForm.controls; }

   posts: any;

  onSubmit() 
  {
    this.submitted = true;
      
        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;
        }
        let hobbies:string = "";
        for(let hobby of this.selectedItemsList)
        {
          hobbies+=hobby.label+" | ";
        }
        // Initialize Params Object
    let Params = new HttpParams();
    // Begin assigning parameters
    Params = Params.append('firstParameter', this.profileForm.value.firstName);
    Params = Params.append('secondParameter', this.profileForm.value.lastName);
    Params = Params.append('thirdParameter', this.profileForm.value.phone);
    Params = Params.append('fourthParameter', this.profileForm.value.gender);
    Params = Params.append('fifthParameter', hobbies);
    return this.http.post('http://192.168.1.94:8000/api/adduserdetails'
    ,{
    params: { params: Params }
    }).subscribe((res: Response) => {
        alert(res);
        window.location.reload()
      }) 
      
       
  }

  onReset() {
    this.submitted = false;
    this.profileForm.reset();
}

getProducts() {
 return  this.http.get('http://192.168.1.94:8000/api/getdata').subscribe(data => {
      this.data.push(data);  
      }, error => console.error(error));
}
  ngOnInit(): void {
    this.fetchSelectedItems()
    this.fetchCheckedIDs()
    
  }
  
  
  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  } 
  
  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }
  
  deleteProduct(id:any) 
  {
    // console.log('Delete Product id ' + id);

    this.http.delete('http://192.168.1.94:8000/api/product/' + id).subscribe(res => {
       alert('Deleted and refresh Table');
       window.location.reload()
       this.data.push(res); 

       console.log(this.data);
        // this.getProducts();
    }, err => {
        console.log('Error occured');
    });
    
  }
  
  showProduct(id:any) 
  {
    console.log('Get id ' + id);
    return this.http.get('http://192.168.1.94:8000/api/product/' + id).subscribe(data => {
        this.product = data;
        this.profileForm.patchValue({ 
          firstName: this.product.firstName,
          lastName: this.product.lastName,
          phone: this.product.phone,
          gender: this.product.gender,
          hobbies: this.product.hobbies
        });
    });
  }

  putProduct(id:any) {
    console.log('Update Product id ' + id);

    let hobbies:string = "";
        for(let hobby of this.selectedItemsList)
        {
          // console.log('update',hobby);
          hobbies+=hobby.label+" | ";
        }
        // console.log('---',hobbies)

        // console.log(this.profileForm.value);

        let updatedObject = this.profileForm.value;

        updatedObject.hobbies = hobbies;

        // console.log('uO',updatedObject);

    this.http.put('http://192.168.1.94:8000/api/product/' + id, updatedObject).subscribe(res => {
        alert('Product Updated and refresh table');
        this.getProducts();
        window.location.reload()
    }, err => {
        console.log('Error occured');
    });
    

  }

  refresh(){
    this.getProducts();
  }
  

}

