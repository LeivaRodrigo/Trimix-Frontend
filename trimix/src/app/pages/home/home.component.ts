import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private toastr: ToastrService,
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
    //Settea sin valor para que la query busque todos
    if (this.filtro.get('tipoDoc').value == this.tipoDocs[0]) {
      this.filtro.patchValue({
        tipoDoc: '',
      });
    }
    this.personaService.buscarPersonas(this.filtro.value).subscribe(
      (personas) => {
        this.listaPersonas = personas;
        console.log(personas);
      },
      (error) => {
        console.error(error);
        this.toastr.error('Error al buscar las personas');
      }
    );
  }

  eliminar(persona: PersonaDTO) {
    if (confirm('Estas seguro que queres eliminar esta persona?')) {
      this.personaService.delete(persona.perId).subscribe(
        (response) => {
          this.toastr.success('Persona eliminada correctamente');
          this.buscarPersonas();
        },
        (error) => {
          console.error(error);
          this.toastr.error('Error al eliminar la persona');
        }
      );
    }
  }
}
