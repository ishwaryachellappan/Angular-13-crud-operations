import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import{ MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
freshnessList=["Brand new","Second Hand","Refursnished"]
productForm !: FormGroup;
actionbtn:string="save"
  constructor(
    private formBuilder : FormBuilder,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialoguRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName:[' ',Validators.required],
      category:[' ',Validators.required],
      freshness:[' ',Validators.required],
      price:[' ',Validators.required],
      comment:[' ',Validators.required],
      date:[' ',Validators.required]
      

    });
    if(this.editData){
      this.actionbtn="update"
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['date'].setValue(this.editData.date)
      this.productForm.controls['comment'].setValue(this.editData.comment)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['category'].setValue(this.editData.category)
    }
  }
  
addproduct(){
  if(this.editData){
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
  }else{
    this.updateProduct()
  }

}
updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id)
.subscribe({
  next:(res)=>{
    alert("product updated suucesfully");
    this.productForm.reset();
    this.dialoguRef.close('update');
  },
  error:()=>{
    alert("error");
  }
})
}
}
