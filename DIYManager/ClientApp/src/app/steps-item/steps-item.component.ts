import { Component, Input, OnInit } from "@angular/core";
import { Step } from "../models/step";

@Component({
  selector: "app-steps-item",
  templateUrl: "./steps-item.component.html",
  styleUrls: ["./steps-item.component.css"],
})
export class StepsItemComponent implements OnInit {
  @Input() public step: Step;
  constructor() {}

  ngOnInit() {}
}
