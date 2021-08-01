import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-world-canvas',
  templateUrl: './world-canvas.component.html',
  styleUrls: ['./world-canvas.component.css']
})
export class WorldCanvasComponent implements OnInit {

  @ViewChild("worldCanvas", { static: true })
  worldCanvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  worldMapSprite: HTMLImageElement;
  mapMarkerSprite: HTMLImageElement;

  actualWidth: number;
  actualHeight: number;

  markerX: number = 0;
  markerY: number = 0;

  //{x: 362.5, y: -32.5}
  //performance metrics
  lastCalledTime: number;
  fps: number;
  deltaTime: number;

  constructor() { }

  ngOnInit(): void {
    this.context = this.worldCanvas.nativeElement.getContext('2d');
    this.worldMapSprite = new Image();
    this.mapMarkerSprite = new Image();
    this.worldMapSprite.src = "../../../../assets/img/worldmap.jpg";
    this.mapMarkerSprite.src = "../../../../assets/img/marker.png";

    this.actualWidth = window.innerWidth * 0.66;
    this.actualHeight = window.innerHeight * 0.66;

    this.worldCanvas.nativeElement.width = this.actualWidth;
    this.worldCanvas.nativeElement.height = this.actualHeight;
    this.measurePerformance();
    this.drawMain();    
    console.log(this.scaleToFitMatrix());
  }         


  async drawMain(): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve({}), (1000 / 60))).then(() => {
      this.measurePerformance();
      //this.context.clearRect(0,0, this.worldCanvas.nativeElement.width, this.worldCanvas.nativeElement.height)
      this.drawCanvas();  
      this.drawMarker();    

      this.drawMain();
    });
  }


  private async drawCanvas() {
    this.context.fillStyle = "#17a2b8";
    this.context.fillRect(0, 0, this.worldCanvas.nativeElement.width, this.worldCanvas.nativeElement.height);
    this.context.drawImage(this.worldMapSprite, 0, 0, this.worldCanvas.nativeElement.width, this.worldCanvas.nativeElement.height);
    this.context.fillText("fps: " + Math.round(this.fps), 10, 10);
  }

  drawMarker() {
    this.markerX = this.worldCanvas.nativeElement.width * 0.55;
    this.context.drawImage(this.mapMarkerSprite, this.markerX, this.markerY, 80, 80);

    if (this.markerY > this.worldCanvas.nativeElement.height * 0.39) return;

    this.markerY += this.deltaTime * 100;
    console.log(this.markerX + " : " + this.markerY);
  }


  measurePerformance() {

    if (!this.lastCalledTime) {
      this.lastCalledTime = performance.now();
      this.fps = 0;
      return;
    }
    this.deltaTime = (performance.now() - this.lastCalledTime) / 1000;
    this.lastCalledTime = performance.now();
    this.fps = 1 / this.deltaTime;
  }

  scaleToFitMatrix() {
    const scale = Math.min(this.actualWidth / 1920, this.actualHeight / 1080);

    return [scale, 0, 0, scale, this.actualWidth / 2, this.actualHeight / 2];
  }

  //utilities
  pointToVirtual(matrix, point) {
    point.x = (point.x - matrix[4]) / matrix[0];
    point.y = (point.y - matrix[5]) / matrix[3];
    return point;
  }

  virtualToPoint(matrix, point) {
    point.x = (point.x * matrix[0]) + matrix[4];
    point.y = (point.y * matrix[3]) + matrix[5];
    return point;
  }

  onClick(e) {
    let rect = this.worldCanvas.nativeElement.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    let point = {
      x: mouseX,
      y: mouseY
    }

    let matrix = this.scaleToFitMatrix();
    let vPoint = this.pointToVirtual(matrix, point);
    console.log(vPoint);
  }
  
}
