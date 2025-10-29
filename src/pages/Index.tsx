import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Perfume {
  id: number;
  name: string;
  description: string;
  price: number;
  samplePrice: number;
  notes: string[];
  image: string;
  type: string;
}

interface CartItem {
  perfume: Perfume;
  isSample: boolean;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const perfumes: Perfume[] = [
    {
      id: 1,
      name: 'Midnight Essence',
      description: 'Глубокий и чувственный аромат с нотами черной орхидеи',
      price: 12500,
      samplePrice: 500,
      notes: ['Черная орхидея', 'Уд', 'Ваниль'],
      image: 'https://cdn.poehali.dev/projects/019c344b-4df8-4481-9c5c-24e3db30b04c/files/d77533fc-2cf7-43d1-8201-503a64dc3061.jpg',
      type: 'Унисекс'
    },
    {
      id: 2,
      name: 'Golden Noir',
      description: 'Роскошная композиция с золотистыми аккордами',
      price: 15000,
      samplePrice: 600,
      notes: ['Шафран', 'Кожа', 'Амбра'],
      image: 'https://cdn.poehali.dev/projects/019c344b-4df8-4481-9c5c-24e3db30b04c/files/95aea077-39d1-492d-870a-1fc1814480a9.jpg',
      type: 'Унисекс'
    },
    {
      id: 3,
      name: 'Dark Velvet',
      description: 'Бархатистый аромат для ценителей классики',
      price: 11000,
      samplePrice: 450,
      notes: ['Пачули', 'Мускус', 'Сандал'],
      image: 'https://cdn.poehali.dev/projects/019c344b-4df8-4481-9c5c-24e3db30b04c/files/875269cc-8c14-4fe1-bae7-bf2b03f715a6.jpg',
      type: 'Унисекс'
    }
  ];

  const addToCart = (perfume: Perfume, isSample: boolean) => {
    setCart([...cart, { perfume, isSample }]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.isSample ? item.perfume.samplePrice : item.perfume.price), 0);
  };

  const navigation = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'Sparkles' },
    { id: 'about', label: 'О бренде', icon: 'Award' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'reviews', label: 'Отзывы', icon: 'Star' },
    { id: 'contacts', label: 'Контакты', icon: 'Mail' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-heading font-bold tracking-wider">SELECTION</h1>
            
            <nav className="hidden md:flex gap-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm tracking-wide transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingBag" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="font-heading text-2xl">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-4 bg-card rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.perfume.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.isSample ? 'Пробник 2мл' : 'Флакон 50мл'}
                              </p>
                              <p className="text-primary font-medium mt-1">
                                {item.isSample ? item.perfume.samplePrice : item.perfume.price} ₽
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(index)}
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          </div>
                        ))}
                        <div className="border-t border-border pt-4 mt-4">
                          <div className="flex justify-between items-center text-lg font-medium mb-4">
                            <span>Итого:</span>
                            <span className="text-primary">{getTotalPrice()} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name="Menu" size={24} />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                    activeSection === item.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="pt-20">
        {activeSection === 'home' && (
          <>
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-0" />
              <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
                <h2 className="text-6xl md:text-8xl font-heading font-bold mb-6 tracking-wide">
                  Essence of Luxury
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Откройте мир изысканных ароматов
                </p>
                <Button
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => setActiveSection('catalog')}
                >
                  Исследовать коллекцию
                </Button>
              </div>
            </section>

            <section className="container mx-auto px-4 py-16 animate-fade-in">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="group overflow-hidden bg-card hover:bg-card/80 transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src="https://cdn.poehali.dev/files/a2598469-b359-4175-a5cc-959fafd64beb.jpg"
                      alt="Selection Market Pink"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Card>

                <Card className="group overflow-hidden bg-card hover:bg-card/80 transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src="https://cdn.poehali.dev/files/7ef907ba-185d-470f-a8af-bedef28643f3.jpg"
                      alt="Selection Market Purple"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Card>

                <Card className="group overflow-hidden bg-card hover:bg-card/80 transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src="https://cdn.poehali.dev/files/dc96b04e-23a8-4d47-84af-3d40e34405b6.jpeg"
                      alt="Selection Market Red"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Card>
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <section className="container mx-auto px-4 py-16 animate-fade-in">
            <h2 className="text-5xl font-heading font-bold mb-4 text-center">Коллекция</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Каждый аромат — произведение искусства. Попробуйте пробник перед покупкой.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {perfumes.map((perfume) => (
                <Card key={perfume.id} className="group overflow-hidden bg-card hover:bg-card/80 transition-all duration-300">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-heading font-semibold">{perfume.name}</h3>
                      <Badge variant="secondary">{perfume.type}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{perfume.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Ноты аромата:</p>
                      <div className="flex flex-wrap gap-2">
                        {perfume.notes.map((note, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Флакон 50мл</span>
                        <span className="font-medium">{perfume.price} ₽</span>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => addToCart(perfume, false)}
                      >
                        В корзину
                      </Button>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground">Пробник 2мл</span>
                        <span className="font-medium text-primary">{perfume.samplePrice} ₽</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => addToCart(perfume, true)}
                      >
                        <Icon name="Droplet" size={16} className="mr-2" />
                        Заказать пробник
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="container mx-auto px-4 py-16 max-w-4xl animate-fade-in">
            <h2 className="text-5xl font-heading font-bold mb-8 text-center">О бренде</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                SELECTION — это воплощение роскоши и элегантности в мире парфюмерии. Мы создаем ароматы для тех, кто ценит изысканность и индивидуальность.
              </p>
              <p>
                Каждый наш парфюм — результат кропотливой работы лучших парфюмеров Европы. Мы используем только натуральные ингредиенты высочайшего качества.
              </p>
              <p>
                Наша философия — дать возможность каждому найти свой уникальный аромат. Именно поэтому мы предлагаем пробники всех ароматов перед покупкой.
              </p>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="container mx-auto px-4 py-16 max-w-4xl animate-fade-in">
            <h2 className="text-5xl font-heading font-bold mb-8 text-center">Доставка</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <Icon name="Truck" size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">По России</h3>
                  <p className="text-muted-foreground mb-4">
                    Доставка курьерской службой СДЭК в любой город России. Срок доставки 2-7 дней.
                  </p>
                  <p className="font-medium">Бесплатно от 5000 ₽</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Icon name="MapPin" size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">Москва</h3>
                  <p className="text-muted-foreground mb-4">
                    Курьерская доставка по Москве в течение дня. Возможен самовывоз из шоурума.
                  </p>
                  <p className="font-medium">Бесплатно от 3000 ₽</p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'reviews' && (
          <section className="container mx-auto px-4 py-16 max-w-4xl animate-fade-in">
            <h2 className="text-5xl font-heading font-bold mb-8 text-center">Отзывы</h2>
            <div className="space-y-6">
              {[
                {
                  name: 'Анна К.',
                  text: 'Midnight Essence — мой абсолютный фаворит! Очень рада, что смогла сначала заказать пробник.',
                  rating: 5
                },
                {
                  name: 'Дмитрий М.',
                  text: 'Потрясающее качество и обслуживание. Golden Noir держится весь день!',
                  rating: 5
                },
                {
                  name: 'Елена С.',
                  text: 'Идея с пробниками — просто находка. Теперь не боюсь покупать парфюм онлайн.',
                  rating: 5
                }
              ].map((review, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-2">{review.text}</p>
                    <p className="font-medium text-sm">— {review.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="container mx-auto px-4 py-16 max-w-4xl animate-fade-in">
            <h2 className="text-5xl font-heading font-bold mb-8 text-center">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium mb-1">Шоурум в Москве</p>
                      <p className="text-muted-foreground">ул. Тверская, 12с1</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium mb-1">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <p className="text-muted-foreground">info@selection-perfume.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4">Часы работы</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Пн-Пт:</span>
                      <span>10:00 - 21:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Сб-Вс:</span>
                      <span>11:00 - 20:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© 2024 SELECTION. Все права защищены.</p>
            <div className="flex gap-6">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;