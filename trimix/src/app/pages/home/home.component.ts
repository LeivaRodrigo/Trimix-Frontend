import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaDTO } from 'src/app/models/PersonaDTO';
import { PersonaService } from 'src/app/services/persona.service';
import { TIPODOCS } from 'src/app/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  personaForm: PersonaDTO;
  filtro: FormGroup;
  tipoDocs = TIPODOCS;
  listaPersonas: PersonaDTO[];

  constructor(
    private form: FormBuilder,
    private router: Router,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.filtro = this.form.group({
      nombre: [null, Validators.required],
      tipoDoc: [this.tipoDocs[0], Validators.required],
    });

    this.personaService.findAll().subscribe(
      (personas) => {
        this.listaPersonas = personas;
        console.log(personas);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buscarPersonas() {
    // let tipoDocForm = this.filtro.get('tipoDoc').value;
    // if(this.filtro.get('tipoDoc').value == this.tipoDocs[0]){

    // }
    this.personaService.buscarPersonas(this.filtro.value).subscribe(
      (personas) => {
        this.listaPersonas = personas;
        console.log(personas);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
