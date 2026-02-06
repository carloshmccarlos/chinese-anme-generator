'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { ScrollText, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { historicalNameRequestSchema } from '@/lib/validators/historical-name';
type FormValues = z.infer<typeof historicalNameRequestSchema>;
interface Props {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
}
export function HistoricalNameForm({ onSubmit, isLoading }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(historicalNameRequestSchema),
    defaultValues: {
      realName: '',
      gender: 'male',
      dynasty: 'Any',
      style: 'Elegant',
      length: 'any',
    },
  });
  const t = useTranslations('forms.historical');
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Card className="overflow-hidden border-none bg-transparent shadow-none">
          <CardHeader className="border-b border-primary/10 pb-6">
            <motion.div variants={itemVariants} className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary/80">
                  {t('eyebrow')}
                </p>
                <CardTitle className="font-display text-3xl text-foreground">{t('title')}</CardTitle>
              </div>
              <span className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-secondary-foreground">
                {t('badge')}
              </span>
            </motion.div>
          </CardHeader>
          <CardContent className="pt-8 space-y-7">
            <div className="rounded-xl border border-primary/10 p-4 md:p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="realName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('realNameLabel')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('realNamePlaceholder')}
                            {...field}
                            className="bg-background/50 border-border/60 focus:border-primary/60 transition-colors"
                          />
                        </FormControl>
                        <FormDescription>{t('realNameDescription')}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('genderLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-border/60">
                              <SelectValue placeholder={t('genderPlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">{t('genderMale')}</SelectItem>
                            <SelectItem value="female">{t('genderFemale')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="dynasty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('dynastyLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-border/60">
                              <SelectValue placeholder={t('dynastyPlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Any">{t('dynastyAny')}</SelectItem>
                            <SelectItem value="Shang-Zhou">{t('dynastyShangZhou')}</SelectItem>
                            <SelectItem value="Qin-Han">{t('dynastyQinHan')}</SelectItem>
                            <SelectItem value="Three Kingdoms">{t('dynastyThree')}</SelectItem>
                            <SelectItem value="Wei-Jin Northern and Southern Dynasties">{t('dynastyWeiJin')}</SelectItem>
                            <SelectItem value="Sui-Tang">{t('dynastySuiTang')}</SelectItem>
                            <SelectItem value="Five Dynasties and Ten Kingdoms">{t('dynastyFiveDyn')}</SelectItem>
                            <SelectItem value="Song">{t('dynastySong')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('styleLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-border/60">
                              <SelectValue placeholder={t('stylePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Elegant">{t('styleElegant')}</SelectItem>
                            <SelectItem value="Powerful">{t('stylePowerful')}</SelectItem>
                            <SelectItem value="Literary">{t('styleLiterary')}</SelectItem>
                            <SelectItem value="Modern">{t('styleModern')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('lengthLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-border/60">
                              <SelectValue placeholder={t('lengthPlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">{t('lengthSingle')}</SelectItem>
                            <SelectItem value="double">{t('lengthDouble')}</SelectItem>
                            <SelectItem value="any">{t('lengthAny')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="surnameType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('surnameTypeLabel')}</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value === 'auto' ? undefined : value)}
                          value={field.value ?? 'auto'}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-border/60">
                              <SelectValue placeholder={t('surnameTypePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="auto">{t('surnameTypeAny')}</SelectItem>
                            <SelectItem value="single">{t('surnameTypeSingle')}</SelectItem>
                            <SelectItem value="double">{t('surnameTypeDouble')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>
            </div>
            <motion.div variants={itemVariants} className="flex justify-center">
              <Button
                type="submit"
                className="w-full rounded-sm py-6 text-xs font-semibold uppercase tracking-[0.35em] transition-all hover:scale-[1.01] md:w-72"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ScrollText className="mr-2 h-5 w-5" />
                )}
                {t('submit')}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.form>
    </Form>
  );
}
