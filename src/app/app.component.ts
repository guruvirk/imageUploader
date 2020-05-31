import { Component, ErrorHandler } from '@angular/core';
import { Box } from './models/box.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  boxes: Box[] = []

  inputId: string

  types: string[] = ['image/png', 'image/jpeg']

  lastIndex: number

  static instancesCount = 0;

  constructor(
    private errorHandler: ErrorHandler,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.showboxes()
  }

  showboxes() {
    for (let i = 0; i <= 5; i++) {
      this.boxes.push(new Box({ id: i, img: '', inputId: `file-uploader-input-${AppComponent.instancesCount++}` }))
      this.lastIndex = i
    }
  }

  onImageSelected($event, selectedboxes: Box) {
    let files = $event.target.files
    if ((files.length === 1)) {
      for (const file of files) { this.uploadImage(file, selectedboxes) }
    } else {
      return this.errorHandler.handleError(`Only single file formats allowed`);
    }
  }

  uploadImage(image: File, selectedbox: Box) {
    let match = false;
    if (this.types.find((i) => i === image.type)) {
      match = true;
    }
    if (!match) {
      return this.errorHandler.handleError(`Only png, jpeg file formats allowed`);
    }
    let imgUrl = URL.createObjectURL(image)
    let img = this.sanitizer.bypassSecurityTrustUrl(imgUrl)
    if (selectedbox.img) {
      selectedbox.img = img
    } else {
      for (let box of this.boxes) {
        if (!box.img) {
          return box.img = img
        }
      }
    }
  }

  removeImage(index) {
    this.boxes.splice(index, 1);
    this.lastIndex = this.lastIndex + 1
    this.boxes.push(new Box({ id: this.lastIndex, img: '', inputId: `file-uploader-input-${AppComponent.instancesCount++}` }))
  }
}
