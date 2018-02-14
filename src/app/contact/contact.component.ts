import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, visibility, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
	host:{
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
	animations: [
		flyInOut(),
		visibility(),
		expand()
  ]
})
export class ContactComponent implements OnInit {
	
	feedbackForm: FormGroup;
	feedback: Feedback;
	feedbackcopy = null;
	loading = false;
	errMess = null;
	submitform = false;
	feedback2 = null;
	contactType = ContactType;
	formErrors = {
		'firstname': '',
		'lastname': '',
		'telnum': '',
		'email': ''
	};
	
	validationMessages = {
		'firstname': {
			'required': 'First Name is required.',
			'minlength': 'First Name must be at least 2 characters long',
			'maxlength': 'First Name cannot be more than 25 characters long'
		},
		
		'lastname': {
			'required': 'Last Name is required.',
			'minlength': 'Last Name must be at least 2 characters long',
			'maxlength': 'Last Name cannot be more than 25 characters long'
		},
		
		'telnum':{
			'required': 'Tel. Number is required',
			'pattern': 'Tel. Number must only contain numbers'
		},
		
		'email': {
			'required': 'Email is required',
			'email': 'Email not in valid format'
		},
	};

	constructor(private fb: FormBuilder, 
		private feedbackservice: FeedbackService, @Inject('BaseURL') private BaseURL) {
	this.createForm();
  }

  ngOnInit() {
  }
  
  createForm() {
	  this.feedbackForm = this.fb.group({
		 firstname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
		 lastname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
		 telnum: ['',[Validators.required, Validators.pattern ]],
		 email: ['',[Validators.required, Validators.email ]],
		 agree: false,
		 contacttype: 'None',
		 message: ''
		 
	  });
	  
	  this.feedbackForm.valueChanges
	  .subscribe(data => this.onValueChanged(data));
	  
	  this.onValueChanged(); // (re)set form validation messages
  }
  
   onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  onSubmit(){
		this.loading = true;
		this.feedback = this.feedbackForm.value;
		console.log(this.feedback);
		console.log("Submitting feedback...");
		console.log("Submitting feedback ..." + this.feedback.firstname);

		this.submitform = true;

		this.feedbackservice.submitFeedback(this.feedback)
		.subscribe(
			(f)=>{
				this.feedback2=f;
				this.loading = false;
				setTimeout(()=>{
					this.feedback2=null;
					
				this.submitform = false;
				},5000)
			},
			errmess => { this.feedback2 = null; this.errMess = <any>errmess; });

			  this.feedbackForm.reset({
		  firstname: '',
		  lastname: '',
		  telnum: '',
		  email: '',
		  agree: false,
		  contacttype: 'None',
		  message: ''
	  });
	  
  }

}