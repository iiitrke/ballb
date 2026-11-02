import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly universityName = 'Shakambhari University';
  protected readonly currentYear = new Date().getFullYear();

  protected readonly navLinks = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Semesters', path: '/semesters', exact: false },
    { label: 'Legal Glossary', path: '/glossary', exact: false },
  ];
}
