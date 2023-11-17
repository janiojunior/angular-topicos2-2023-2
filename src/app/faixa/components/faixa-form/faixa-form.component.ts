import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Faixa } from 'src/app/models/faixa.model';
import { Modalidade } from 'src/app/models/modalidade.model';
import { FaixaService } from 'src/app/services/faixa.service';

@Component({
  selector: 'app-faixa-form',
  templateUrl: './faixa-form.component.html',
  styleUrls: ['./faixa-form.component.css']
})
export class FaixaFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;
  
  modalidades: Modalidade[] = [];
  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
              private faixaService: FaixaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id:[null],
      nome:[null],
      descricao:[null],
      preco:[null],
      estoque:[null],
      modalidade:[null]
    });

    faixaService.findModalidades().subscribe(data => {
      this.modalidades = data;
      this.initializeForm();
    });

  }

  initializeForm() {
    const faixa: Faixa = this.activatedRoute.snapshot.data['faixa'];

    const modalidade = this.modalidades.find(m => m.id === (faixa?.modalidade?.id || null));

    console.log(modalidade);

    // carregando a imagem do preview
    if (faixa && faixa.nomeImagem) {
      this.imagePreview = this.faixaService.getUrlImagem(faixa.nomeImagem);
      this.fileName = faixa.nomeImagem;
    }

    this.formGroup = this.formBuilder.group({
      id:[(faixa && faixa.id) ? faixa.id : null],
      nome:[(faixa && faixa.nome) ? faixa.nome : '', Validators.required],
      descricao:[(faixa && faixa.descricao) ? faixa.descricao : '', Validators.required],
      preco:[(faixa && faixa.preco) ? faixa.preco : '', Validators.required],
      estoque:[(faixa && faixa.estoque) ? faixa.estoque : '', Validators.required],
      //modalidade: [faixa?.modalidade?.id || null, Validators.required] 
      modalidade:[modalidade]
    });
    console.log(this.formGroup.value);
  }

  salvar() {
    if (this.formGroup.valid) {
      const faixa = this.formGroup.value;
      if (faixa.id == null) {
        this.faixaService.save(faixa).subscribe({
          next: (faixaCadastrada) => {
            this.uploadImage(faixaCadastrada.id);
          },
          error: (errorResponse) => {
             // Processar erros da API
            this.apiResponse = errorResponse.error; 

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('descricao')?.setErrors({ apiError: this.getErrorMessage('descricao') });
            this.formGroup.get('preco')?.setErrors({ apiError: this.getErrorMessage('preco') });
            this.formGroup.get('estoque')?.setErrors({ apiError: this.getErrorMessage('estoque') });
      
            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.faixaService.update(faixa).subscribe({
          next: (faixaAtualizada) => {
            this.uploadImage(faixaAtualizada.id);
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });        
      }
    }
  }

  getErrorMessage(fieldName: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
    return error ? error.message : '';
  }

  excluir() {
    const faixa = this.formGroup.value;
    if (faixa.id != null) {
      this.faixaService.delete(faixa).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/faixas/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }      
  }

  carregarImagemSelecionada(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      // carregando image preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

  }

  private uploadImage(faixaId: number) {
    if (this.selectedFile) {
      this.faixaService.uploadImagem(faixaId, this.selectedFile.name, this.selectedFile)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/faixas/list');
        },
        error: err => {
          console.log('Erro ao fazer o upload da imagem');
          // tratar o erro
        }
      })
    } else {
      this.router.navigateByUrl('/faixas/list');
    }
  }

}
