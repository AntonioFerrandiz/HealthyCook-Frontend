import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  helpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.helpForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  onSubmit() {
    if (this.helpForm.valid) {
      const title = this.helpForm.get('title').value;
      const description = this.helpForm.get('description').value;

      // Aquí puedes agregar la lógica para manejar el envío del formulario, como enviar un mensaje o realizar una acción.
      console.log('Título:', title);
      console.log('Descripción:', description);

      // Limpia el formulario después del envío
      this.helpForm.reset();
    }
  }

  ngOnInit(): void {
  }
}