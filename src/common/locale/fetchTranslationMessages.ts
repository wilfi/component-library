import { Locale } from '../../types/locale';
import { ResolvedIntlConfig } from 'react-intl';

const fetchTranslationMessages = async (
  widgetId: string,
  langCode: string,
): Promise<ResolvedIntlConfig['messages']> => {
  const locale = langCode as Locale;
  // We don't want to do the extra fetching for English since it's the default.
  if (locale === Locale.EN) {
    return {};
  }
  try {
    // This relies on the CRA convention for PUBLIC_URL.
    const response = await window.fetch(
      `${process.env.PUBLIC_URL}/translations/${widgetId}/${locale}.json`,
    );
    return response.json();
  } catch (e) {
    // If something went wrong do not fail the widget, use the default language.
    return {};
  }
};

export default fetchTranslationMessages;
