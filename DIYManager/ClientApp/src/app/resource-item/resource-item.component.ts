import { Component, Input, OnInit } from "@angular/core";
import { ResourceDTO } from "../models/resourceDTO";

@Component({
  selector: "app-resource-item",
  templateUrl: "./resource-item.component.html",
  styleUrls: ["./resource-item.component.css"],
})
export class ResourceItemComponent implements OnInit {
  @Input() public resource: ResourceDTO;
  constructor() {}

  ngOnInit() {}
}
