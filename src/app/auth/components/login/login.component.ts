import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      this.authService.login(email, password).subscribe( {
        next: (resp) => {
          //this.showSnackbarTopPosition(this.authService.getToken(), 'Fechar', 2000);
          // redirecionar para a página principal
          this.router.navigateByUrl('/user/compras/produtos');
        },
        error: (err) => {
          console.log(err);
          this.showSnackbarTopPosition("Usuário ou senha Inválidos", 'Fechar', 2000);
        }
      });   
    } else {
      this.showSnackbarTopPosition("Dados inválidos", 'Fechar', 2000);
    }
  }

  onRegister() {
    // criar usuário
  }

  showSnackbarTopPosition(content:any, action:any, duration:any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
