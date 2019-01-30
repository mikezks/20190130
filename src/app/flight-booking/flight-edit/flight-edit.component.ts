import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateCity } from '../../shared/validators/city-validator';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit {
  id: number;
  showDetails: string;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(
        params => {
          this.id = params['id'];
          this.showDetails = params['showDetails'];
        }
      );

    this.editForm = this.fb.group({
      id: [
        this.id
      ],
      from: [
        'Graz',
        [
          Validators.required
        ]
      ],
      to: [
        'Hamburg',
        [
          validateCity([
            'Graz',
            'Hamburg'
          ])
        ]
      ],
      date: [
        ''
      ]
    });

    console.log('Valid', this.editForm.valid);
    console.log('Value', this.editForm.value);
    console.log('Touched', this.editForm.touched);
    console.log('Dirty', this.editForm.dirty);

    this.editForm.valueChanges
      .subscribe(formData => console.log(formData));
  }

}
