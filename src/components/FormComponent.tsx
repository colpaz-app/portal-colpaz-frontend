import Button from './Button';
import '../assets/styles/FormComponent.css';
import Input from './Input';
import Label from './Label';

interface Field<T> {
    name: keyof T;
    label: string;
    type?: 'text' | 'textarea' | 'checkbox' | 'date' | 'url';
    required?: boolean;
    multiline?: boolean;
}

interface FormComponentProps<T> {
    title: string;
    fields: Field<T>[];
    data: T;
    onChange: <K extends keyof T>(field: K, value: T[K]) => void;
    onSubmit: () => void;
    onCancel?: () => void;
    translations?: {
        languages: string[];
        fields: string[];
        values: Record<string, Record<string, string>>;
        onTranslationChange: (lang: string, field: string, value: string) => void;
    };
}

function FormComponent<T>({
    title,
    fields,
    data,
    onChange,
    onSubmit,
    onCancel,
    translations,
}: FormComponentProps<T>) {
    return (
        <form
            className="form-component"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <h2>{title}</h2>

            {fields.map((field) => {
                const value = data[field.name];
                const inputId = String(field.name);

                return (
                    <div key={inputId} className="form-group">
                        <Label htmlFor={inputId}>{field.label}</Label>

                        {field.type === 'textarea' ? (
                            <textarea
                                id={inputId}
                                value={String(value ?? '')}
                                onChange={(e) =>
                                    onChange(field.name, e.target.value as T[typeof field.name])
                                }
                            />
                        ) : (
                            <Input
                                id={inputId}
                                name={String(field.name)}
                                type={field.type || 'text'}
                                value={field.type === 'checkbox' ? undefined : String(value ?? '')}
                                checked={field.type === 'checkbox' ? Boolean(value) : undefined}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    onChange(
                                        field.name,
                                        (
                                            field.type === 'checkbox'
                                                ? e.target.checked
                                                : e.target.value
                                        ) as T[typeof field.name]
                                    )
                                }
                            />
                        )}
                    </div>
                );
            })}

            {translations && (
                <div className="form-translations">
                    <h3>Traducciones</h3>
                    {translations.languages.map((lang) => (
                        <div key={lang} className="translation-section">
                            <h4>{lang.toUpperCase()}</h4>
                            {translations.fields.map((field) => (
                                <div key={`${lang}-${field}`} className="form-group">
                                    <Label>{field}</Label>
                                    <Input
                                        name={`${lang}-${field}`}
                                        type="text"
                                        value={translations.values[lang]?.[field] || ''}
                                        onChange={(e) =>
                                            translations.onTranslationChange(
                                                lang,
                                                field,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            <div className="form-actions">
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
                {onCancel && (
                    <Button variant="secondary" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
            </div>
        </form>
    );
}

export default FormComponent;