import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetailComponent implements OnInit {
  lesson: any = null;
  category: string = '';
  lessonId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.lessonId = params['id'];
      this.loadLesson();
    });
  }

  loadLesson() {
    // Aquí se cargaría la lección completa desde el backend
    // this.courseService.getLessonById(this.lessonId).subscribe(lesson => {
    //   this.lesson = lesson;
    // });

    // Por ahora, datos de ejemplo
    this.lesson = {
      id: this.lessonId,
      title: this.getLessonTitle(),
      content: `
        <h3>Contenido de la lección</h3>
        <p>Este es el contenido completo de la lección que vendrá desde el backend. Aquí se mostrará información detallada sobre el tema seleccionado.</p>
        
        <h4>Información adicional</h4>
        <p>El contenido específico de cada lección será cargado dinámicamente desde la base de datos según la categoría y el ID de la lección.</p>
        
        <h4>Próximos pasos</h4>
        <p>Una vez implementado el backend, este contenido se reemplazará con la información real de cada lección.</p>
      `,
      videoUrl: 'https://example.com/tutankamon-video', // URL que vendrá del backend
      duration: 5,
      category: this.category
    };
  }

  getLessonTitle(): string {
    switch(this.category) {
      case 'contabilidad':
        return '¿Sabías que la contabilidad existe desde hace más de 7,000 años?';
      case 'finanzas':
        return '¿Sabías que el interés compuesto es considerado la octava maravilla del mundo?';
      case 'marketing':
        return '¿Sabías que el primer anuncio impreso se publicó en 1472?';
      case 'emprendimiento':
        return '¿Sabías que el 90% de las startups fracasan en sus primeros años?';
      default:
        return 'Lección de InfoCaps';
    }
  }
  
  goBack() {
    this.router.navigate([`/${this.category}`]);
  }
}