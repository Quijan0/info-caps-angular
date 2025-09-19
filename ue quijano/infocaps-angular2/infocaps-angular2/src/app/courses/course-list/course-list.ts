import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  @Input() category: string = '';
  @Input() categoryIcon: string = '';
  @Input() categoryColor: string = '';
  
  // Datos que vendrán del backend
  lessons = [
    {
      id: 1,
      title: '¿Sabías que Tutankamón se convirtió en faraón de Egipto con solo 9 años?',
      description: 'Su tumba fue hallada en 1922 casi intacta, ¡y se volvió uno de los descubrimientos más famosos de la arqueología!',
      content: '', // Contenido completo que vendrá del backend
      videoUrl: '', // URL del video que vendrá del backend
      duration: 5 // Duración en minutos
    },
    {
      id: 2,
      title: '¿Sabías que Tutankamón se convirtió en faraón de Egipto con solo 9 años?',
      description: 'Su tumba fue hallada en 1922 casi intacta, ¡y se volvió uno de los descubrimientos más famosos de la arqueología!',
      content: '',
      videoUrl: '',
      duration: 5
    },
    {
      id: 3,
      title: '¿Sabías que Tutankamón se convirtió en faraón de Egipto con solo 9 años?',
      description: 'Su tumba fue hallada en 1922 casi intacta, ¡y se volvió uno de los descubrimientos más famosos de la arqueología!',
      content: '',
      videoUrl: '',
      duration: 5
    },
    {
      id: 4,
      title: '¿Sabías que Tutankamón se convirtió en faraón de Egipto con solo 9 años?',
      description: 'Su tumba fue hallada en 1922 casi intacta, ¡y se volvió uno de los descubrimientos más famosos de la arqueología!',
      content: '',
      videoUrl: '',
      duration: 5
    }
  ];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Aquí se cargarían las lecciones desde el backend
    // this.loadLessonsFromBackend();
    
    this.route.url.subscribe(segments => {
      if (segments.length > 0) {
        this.category = segments[0].path;
        this.setCategoryData();
      }
    });
  }

  setCategoryData() {
    switch(this.category) {
      case 'contabilidad':
        this.categoryIcon = '📊';
        this.categoryColor = '#e74c3c';
        break;
      case 'finanzas':
        this.categoryIcon = '💰';
        this.categoryColor = '#27ae60';
        break;
      case 'marketing':
        this.categoryIcon = '📈';
        this.categoryColor = '#3498db';
        break;
      case 'emprendimiento':
        this.categoryIcon = '🚀';
        this.categoryColor = '#f39c12';
        break;
    }
  }

  exploreLesson(lesson: any) {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      // Si no está logueado, redirigir a login
      this.router.navigate(['/login']);
      return;
    }

    if (!currentUser.hasSubscription) {
      // Si no tiene suscripción, redirigir a página de pago
      // Guardar información de la lección para después del pago
      localStorage.setItem('pendingLesson', JSON.stringify({
        lessonId: lesson.id,
        category: this.category
      }));
      this.router.navigate(['/subscription']);
    } else {
      // Si tiene suscripción, ir al detalle de la lección
      this.router.navigate(['/lesson', this.category, lesson.id]);
    }
  }

  // Método que se usará para cargar datos del backend
  private loadLessonsFromBackend() {
    // Aquí se haría la llamada al backend para obtener las lecciones
    // this.courseService.getLessonsByCategory(this.category).subscribe(lessons => {
    //   this.lessons = lessons;
    // });
  }
}