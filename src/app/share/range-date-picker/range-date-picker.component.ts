import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter, Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  'ar': {
    weekdays: ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  }
  // other languages you would support
};
@Injectable()
export class I18n {
  language = 'ar';
}
// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }] // define custom NgbDatepickerI18n provider
})
export class RangeDatePickerComponent implements OnInit, AfterViewInit {


  @Input() initFromDate: Date | null;
  @Input() initToDate: Date | null;
  @Input() icons: string;
  @Output()
  change: EventEmitter<{ fromDate: NgbDate, toDate: NgbDate }> = new EventEmitter<{ fromDate: NgbDate, toDate: NgbDate }>();

  // Reference 
  @ViewChild('datepicker', { static: true }) datepicker;
  @ViewChild('DatepickerFooter', { static: true }) DatepickerFooterElement;

  // NgbDatePicker config
  model: NgbDateStruct;
  displayMonths = 2;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'visible';
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;



  // footer
  showDatepickerFooter = false;
  positionDatepickerFooter = 'relative';

  // resize
  widthPerDay;
  heightPerDay;

  ngOnInit() {
    if (this.initFromDate) {
      this.fromDate.year = this.initFromDate.getFullYear();
      this.fromDate.month = this.initFromDate.getUTCMonth() + 1;
      this.fromDate.day = this.initFromDate.getDate();
    }

    if (this.initToDate) {
      this.toDate.year = this.initToDate.getFullYear();
      this.toDate.month = this.initToDate.getUTCMonth() + 1;
      this.toDate.day = this.initToDate.getDate();
    }
  }

  ngAfterViewInit() {
    this.resizeDatePicker();
  }


  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  toggle() {
    this.datepicker.toggle();
    this.showDatepickerFooter = !this.showDatepickerFooter;
    this.positionDatepickerFooter = 'absolute';
    this.change.emit({ fromDate: this.fromDate, toDate: this.toDate });

  }

  anytime() {
    // TODO : any time for all dates
    this.toggle();
  }

  resizeDatePicker() {

    this.widthPerDay = (window.innerWidth) / 7;
    this.heightPerDay = (window.innerHeight) / 12 - 10;
    this.showDatepickerFooter = true;
    this.positionDatepickerFooter = 'relative';
    setTimeout(() => {
      this.heightPerDay = (window.innerHeight - this.DatepickerFooterElement.nativeElement.offsetHeight) / 12 - 10;
      this.positionDatepickerFooter = 'absolute';
      setTimeout(() => {
        this.showDatepickerFooter = false;
      }, 1);
    }, 1);

  }
}