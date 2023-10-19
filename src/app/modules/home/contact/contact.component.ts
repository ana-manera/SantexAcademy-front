import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/core/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
  ) {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      mail: ['', Validators.required],
      reason: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      this.contactService.postContact(this.addressForm.value).subscribe((res: any) => {

      })

      alert('¡Gracias por enviar el formulario!');
    } else {
      console.error('Formulario inválido. Por favor, complete todos los campos requeridos.');
    }
  }

  }

