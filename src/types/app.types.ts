export type TemplateType = 'modern' | 'classic' | 'executive' | 'creative';


export interface AppState {
    currentView: 'cv-builder' | 'cover-builder' | 'templates' | 'dashboard';
    isLoading:    boolean;
    theme:        'light' | 'dark';
}

