import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }
  redirectToDespensa():void {
    this.toastr.info('Esta ventana se encuentra en construcción, vuelve luego!','Holaa!')
  }

  redirectToRecipes():void {
    this.router.navigate(['/recipes'])
  }

  redirectToRestaurants():void {
    this.router.navigate(['/restaurants'])
  }
}
