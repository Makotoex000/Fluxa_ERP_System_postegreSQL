import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class TabsPage implements OnInit, OnDestroy {
  tabAtiva = 'dashboard';
  private rotaSub: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.atualizarTabAtiva(this.router.url);
    this.rotaSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.atualizarTabAtiva(e.url));
  }

  ngOnDestroy() {
    this.rotaSub?.unsubscribe();
  }

  private atualizarTabAtiva(url: string) {
    const partes = url.split('/');
    this.tabAtiva = partes[partes.length - 1] || 'dashboard';
  }

  navegarPara(tab: string) {
    const el = document.getElementById('tab-btn-' + tab);
    if (el) el.blur();
    this.router.navigate(['/tabs/' + tab]);
  }

  onSairClick() {
    const el = document.getElementById('btn-sair');
    if (el) el.blur();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
