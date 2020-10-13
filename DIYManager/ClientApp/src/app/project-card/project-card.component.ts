import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @ViewChild('projectThumbnail', { static: true }) projectThumbnail: ElementRef;

  @Input() project: Project;
  constructor() { }

  isThumbnailAttached() {
    var result = this.project.thumbnail != null && this.project.thumbnail.length > 0;
    return result;
  }

  getFileContent() {
    return this.project.thumbnail;
  }

  ngOnInit() {
    this.projectThumbnail.nativeElement.src = "data:image/png;base64," + this.getFileContent();
  }

}
