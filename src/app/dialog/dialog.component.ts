import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import{ MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
freshnessList=["Brand new","Second Hand","Refursnished"]
productForm !: FormGroup;
  constructor(private formBuilder : FormBuilder,private api:ApiService,private dialoguRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName:[' ',Validators.required],
      category:[' ',Validators.required],
      freshness:[' ',Validators.required],
      price:[' ',Validators.required],
      comment:[' ',Validators.required],
      date:[' ',Validators.required]
      

    })
  }
  
addproduct(){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(Response)=>{
        alert("poduct added succesfully");
        this.productForm.reset();
        this.dialoguRef.close('save');
      },
      error:()=>{
          alert("something went wrong");
      }
      
    })
  }

}
}
