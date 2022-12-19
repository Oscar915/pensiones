import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Habitacion } from 'src/app/models/Habitacion';
import { DataService } from 'src/app/Services/data.service';


@Component({
  selector: 'app-ofertar',
  templateUrl: './ofertar.component.html',
  styleUrls: ['./ofertar.component.scss']
})
export class OfertarComponent implements OnInit {
    
  Nombre:string;

  HabitacionForm:FormGroup;
  Habitaciones:Habitacion[];

  HabilitarAct:Boolean
  constructor(private _Router:Router, 
    private _DataService:DataService,  
    private _formBuilder: FormBuilder) {

    this.Nombre = ""+sessionStorage.getItem('Nombre')
    this.Habitaciones=[]
    this.HabilitarAct = false

    this.HabitacionForm = this._formBuilder.group({
      Nombre: ['', Validators.required],
      Departamento:['', Validators.required],
      Municipio:['', Validators.required],
      Direccion:['', Validators.required],
      Imagen:['', Validators.required],
      Disponibilidad:['', Validators.required],
      Costo:['',Validators.required],
      Descripcion:['', Validators.required]
    })

     }

  ngOnInit(): void {
    this._DataService.getHabitaciones()
    .subscribe(
      Resp => {this.Habitaciones = Resp,
      console.log(Resp);
    },
      Err => console.log(Err))


  }

  Ejecutar(){
    console.log(this.HabitacionForm.value);
    let Hab = this.HabitacionForm.value;

    let Habitacion:Habitacion={
    Nombres: Hab.Nombre,
    Disponibilidad:Hab.Disponibilidad,
    Descripcion:Hab.Descripcion,
    Precio:Hab.Costo,
    Imagen:Hab.Imagen,
    Departamento:Hab.Departamento,
    Ciudad:Hab.Municipio,
    Direccion:Hab.Direccion,
    Id_administrador: +sessionStorage.getItem('Id')!
    }

    console.log(Habitacion);

    this._DataService.setHabitacion(Habitacion)
    .subscribe( 
    Resp => {alert(Resp)
    this.Habitaciones.push(Habitacion)
  },
    Err => console.log(Err))

    this.HabitacionForm.reset()

  }

  Salir(){
  sessionStorage.clear()
  this._Router.navigate(["Login"])
  }
  

  Editar(i:number){
    this.HabitacionForm.controls['Nombre'].setValue(this.Habitaciones[i].Nombres)
    this.HabitacionForm.controls['Departamento'].setValue(this.Habitaciones[i].Departamento)
    this.HabitacionForm.controls['Municipio'].setValue(this.Habitaciones[i].Ciudad)
    this.HabitacionForm.controls['Direccion'].setValue(this.Habitaciones[i].Direccion)
    this.HabitacionForm.controls['Imagen'].setValue(this.Habitaciones[i].Imagen)
    this.HabitacionForm.controls['Disponibilidad'].setValue(this.Habitaciones[i].Disponibilidad)
    this.HabitacionForm.controls['Costo'].setValue(this.Habitaciones[i].Precio)
    this.HabitacionForm.controls['Descripcion'].setValue(this.Habitaciones[i].Descripcion)

    this.HabilitarAct = true

    
  }

  Actualizar(){
    this.HabilitarAct = false
    this.HabitacionForm.reset()
  }

  
}
