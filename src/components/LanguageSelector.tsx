
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'العربية' : 'Español'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-slate-800/95 border-white/20 backdrop-blur-sm"
      >
        <DropdownMenuItem
          onClick={() => setLanguage('ar')}
          className={`text-white hover:bg-white/20 cursor-pointer ${
            language === 'ar' ? 'bg-white/10' : ''
          }`}
        >
          🇸🇦 العربية
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('es')}
          className={`text-white hover:bg-white/20 cursor-pointer ${
            language === 'es' ? 'bg-white/10' : ''
          }`}
        >
          🇪🇸 Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
