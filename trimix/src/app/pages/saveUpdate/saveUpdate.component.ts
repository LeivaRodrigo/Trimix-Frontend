import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { TIPODOCS } from 'src/app/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaDTO } from '../../models/PersonaDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saveUpdate',
  templateUrl: './saveUpdate.component.html',
  styleUrls: ['./saveUpdate.component.css'],
})
export class SaveUpdateComponent implements OnInit {
  public personaForm: FormGroup;
  tipoDocs = TIPODOCS;
  private idPersona: any;

  constructor(
    public form: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.personaForm = this.form.group({
      perId: [null, Validators.required],
      perApellido: [null, Validators.required],
      perFechaNacimiento: [null, Validators.required],
      perNombre: [null, Validators.required],
      perNumeroDocumento: [null, Validators.required],
      perTipoDocumento: [null, Validators.required],
    });

    this.idPersona = this.activatedRouter.snapshot.params['id'];
    if (this.idPersona) {
      this.personaService.findById(this.idPersona).subscribe(
        (persona) => {
          this.settearForm(persona);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  settearForm(persona: PersonaDTO) {
    this.personaForm.setValue({
      perId: persona.perId,
      perApellido: persona.perApellido,
      perFechaNacimiento: persona.perFechaNacimiento,
      perNombre: persona.perNombre,
      perNumeroDocumento: persona.perNumeroDocumento,
      perTipoDocumento: persona.perTipoDocumento,
    });
  }

  save(): void {
    this.personaService.save(this.personaForm.value).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Persona guardada');
        this.router.navigate(['/'], { skipLocationChange: true });
      },
      (error) => {
        console.error(error);
        this.toastr.error('Error al guardar la persona');
      }
    );
  }
}
