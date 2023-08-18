import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.css']
})
export class EstadoFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private estadoService: EstadoService,
              private router: Router) {
    this.formGroup = formBuilder.group({
      nome:['', Validators.required],
      sigla:['', Validators.required]
    })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoEstado = this.formGroup.value;
      this.estadoService.salvar(novoEstado).subscribe({
        next: (estadoCadastrado) => {
          this.router.navigateByUrl('/estados/list');
        },
        error: (err) => {
          console.log('Erro ao salvar' + JSON.stringify(err));
        }
      })
    
    }
  }

}
