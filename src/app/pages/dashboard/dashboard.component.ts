import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../@core/data/user.service';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  privData = this.userService.privData;
  caData: Object[];
  summaryData: Object[];
  source = new LocalDataSource();
  popupData: Object = {};
  popup: Boolean = false;

  settings = {
    actions: false,
    mode: 'external',
    hideSubHeader: true,
    noDataMessage: 'Cargando Datos',
    columns: {
      ARTICULO: {
        title: '#Articulo',
      },
      DESCRIPCION: {
        title: 'Descripcion',
      },
      CLASE_ABC: {
        title: 'Categoria',
      },
      ORDEN_MINIMA: {
        title: 'Orden Minima',
      },
      FACTOR_EMPAQUE: {
        title: 'Empaque (unidades)',
      },
      cant_pedir_ca: {
        title: 'Cantidad Pedir (CA)',
      },
      cant_pedir_priv: {
        title: 'Cantidad Pedir (Priv)',
      },
      cant_pedir_total: {
        title: 'Cantidad Pedir (Total)',
      },
    },
  };

  constructor(private userService: UserService) {}// ,
              // private router: Router,
              // private route: ActivatedRoute) {}

  info(event) {
    this.popup = true;
    this.userService.popupData = event.data;
    this.popupData = event.data;
  }

  ngOnInit() {
    this.userService.getCAData()
    .subscribe(caRes => {
      this.caData = caRes;
      this.source.load(this.caData);
    });

    this.userService.getPrivData()
    .subscribe(privRes => {
      this.privData = privRes;
    });
  }
}
