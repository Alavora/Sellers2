import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  public idShop!: string;
  ngOnInit(): void {
    this.idShop = this.route.snapshot.paramMap.get('id') || '';
  }
}
