package lib.i18n;

import lombok.Getter;

import java.text.NumberFormat;
import java.util.Currency;
import java.util.Locale;

@Getter
public enum L10n {

  DEFAULT(Locale.US),
  US(Locale.US),
  ID(new Locale("id", "ID")),

  ;

  private final Locale locale;
  private final NumberFormat numberFormat;
  private final Currency currency;

  L10n(Locale locale) {
    this.locale = locale;
    this.numberFormat = NumberFormat.getCurrencyInstance(locale);
    this.currency = Currency.getInstance(locale);
  }

}
