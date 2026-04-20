import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { LogOut, LayoutDashboard, MessageSquare, ShoppingBag, Calendar, Phone, Mail, MapPin, Hash, User, Trash2, CheckCircle, Clock, Home, MessageCircle, Handshake } from 'lucide-react';
import { signInAnonymously } from 'firebase/auth';
import { cn } from '@/src/lib/utils';

export const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'contacts' | 'partners'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string, collection: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'info0102@') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Credenciais inválidas');
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const qOrders = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubOrders = onSnapshot(qOrders, 
      (snapshot) => {
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (err) => {
        console.error("Erro ao monitorar contratações:", err);
        if (err.code === 'permission-denied') {
          setIsLoggedIn(false);
          setError('Sessão expirada ou sem permissão.');
        }
      }
    );

    const qContacts = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubContacts = onSnapshot(qContacts, 
      (snapshot) => {
        setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (err) => console.error("Erro ao monitorar contatos:", err)
    );

    const qPartners = query(collection(db, 'partners'), orderBy('createdAt', 'desc'));
    const unsubPartners = onSnapshot(qPartners, 
      (snapshot) => {
        setPartners(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (err) => console.error("Erro ao monitorar parceiros:", err)
    );

    return () => {
      unsubOrders();
      unsubContacts();
      unsubPartners();
    };
  }, [isLoggedIn]);

  const handleDelete = async () => {
    if (!confirmDelete) return;
    
    const { id, collection: colName } = confirmDelete;
    setDeletingId(id);
    setConfirmDelete(null);

    try {
      await deleteDoc(doc(db, colName, id));
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir registro. Verifique as permissões do banco de dados.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return '-';
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  };

  const getWhatsAppLink = (phone: string, name: string) => {
    const cleanNumber = phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá ${name}, falo da Info+Saúde sobre sua solicitação no site.`);
    return `https://wa.me/55${cleanNumber}?text=${message}`;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] w-full max-w-md space-y-10 border border-black/[0.03]"
        >
          <div className="text-center space-y-3">
             <div className="w-16 h-16 gradient-brand rounded-3xl mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-brand-primary/20">
                <LayoutDashboard className="w-8 h-8" />
             </div>
            <h1 className="text-3xl font-bold text-soft-black tracking-tight">Portal Admin</h1>
            <p className="text-text-gray font-medium">Controle de Mensagens e Pedidos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[2px] text-text-gray ml-1">Usuário</label>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Seu login"
                  className="w-full px-6 py-4 bg-soft-gray rounded-2xl border-2 border-transparent outline-none focus:border-brand-primary/20 focus:bg-white transition-all text-soft-black font-semibold"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[2px] text-text-gray ml-1">Senha</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-soft-gray rounded-2xl border-2 border-transparent outline-none focus:border-brand-primary/20 focus:bg-white transition-all text-soft-black font-semibold"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm font-bold text-center bg-red-50 py-3 rounded-xl">{error}</motion.p>}

            <button className="w-full py-5 gradient-brand text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-primary/20 text-lg">
              Acessar Central
            </button>
          </form>

          <div className="text-center">
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              Sair para o site
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans">
      {/* Sidebar Refinada */}
      <aside className="w-full md:w-72 bg-white border-r border-black/[0.05] p-8 flex flex-col gap-10 z-20">
        <a 
          href="#" 
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-primary transition-colors group mb-2"
        >
          <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar ao Site
        </a>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white shadow-lg">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="flex items-baseline text-2xl font-bold tracking-tighter">
            <span>info</span><span className="text-brand-accent">+saúde</span>
          </div>
        </div>

        <nav className="flex flex-col gap-3 flex-1">
          <button 
            onClick={() => setActiveTab('orders')}
            className={cn(
              "flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all group",
              activeTab === 'orders' 
                ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20" 
                : "text-text-gray hover:bg-soft-gray hover:text-soft-black"
            )}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              Contratações
            </div>
            {orders.length > 0 && (
              <span className={cn("text-[10px] px-2 py-0.5 rounded-full", activeTab === 'orders' ? "bg-white/20" : "bg-soft-gray text-text-gray")}>
                {orders.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={cn(
              "flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all group",
              activeTab === 'contacts' 
                ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20" 
                : "text-text-gray hover:bg-soft-gray hover:text-soft-black"
            )}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              Contatos
            </div>
            {contacts.length > 0 && (
              <span className={cn("text-[10px] px-2 py-0.5 rounded-full", activeTab === 'contacts' ? "bg-white/20" : "bg-soft-gray text-text-gray")}>
                {contacts.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('partners')}
            className={cn(
              "flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all group",
              activeTab === 'partners' 
                ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20" 
                : "text-text-gray hover:bg-soft-gray hover:text-soft-black"
            )}
          >
            <div className="flex items-center gap-3">
              <Handshake className="w-5 h-5" />
              Parceiros
            </div>
            {partners.length > 0 && (
              <span className={cn("text-[10px] px-2 py-0.5 rounded-full", activeTab === 'partners' ? "bg-white/20" : "bg-soft-gray text-text-gray")}>
                {partners.length}
              </span>
            )}
          </button>
        </nav>

        <div className="pt-8 border-t border-black/5">
          <button 
            onClick={() => { window.location.href = '#'; window.location.reload(); }}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all font-sans"
          >
            <LogOut className="w-5 h-5" />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content Área */}
      <main className="flex-1 overflow-y-auto max-h-screen bg-[#F8FAFC]">
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-12">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-widest">
                <Clock className="w-4 h-4" /> Atualizado em tempo real
              </div>
              <h1 className="text-4xl font-extrabold text-soft-black tracking-tight flex items-center gap-4">
                {activeTab === 'orders' ? 'Central de Adesões' : activeTab === 'contacts' ? 'Gestão de Leads' : 'Gestão de Parceiros'}
                <span className="inline-flex items-center justify-center bg-brand-primary text-white text-lg font-black px-4 py-1 rounded-2xl shadow-lg shadow-brand-primary/20">
                  {activeTab === 'orders' ? orders.length : activeTab === 'contacts' ? contacts.length : partners.length}
                </span>
              </h1>
              <p className="text-text-gray text-lg font-medium">Acompanhe as interações oficiais do seu site.</p>
            </div>
          </header>

          <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {activeTab === 'orders' ? (
                orders.map(order => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={order.id} 
                    className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-black/[0.03] flex flex-col lg:flex-row gap-8 relative group"
                  >
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="px-4 py-1.5 bg-brand-primary/[0.08] text-brand-primary rounded-full text-[11px] font-black uppercase tracking-wider">
                             {order.planName}
                           </div>
                           <div className="text-xs font-bold text-text-gray flex items-center gap-1.5">
                             <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                             {formatDate(order.createdAt)}
                           </div>
                         </div>
                         <button 
                             onClick={() => setConfirmDelete({ id: order.id, collection: 'orders' })}
                             disabled={deletingId === order.id}
                             className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                             title="Excluir Registro"
                         >
                           <Trash2 className="w-5 h-5" />
                         </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-2">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Titular do Plano</div>
                          <div className="flex items-center gap-3 font-bold text-soft-black text-lg">
                             <div className="w-8 h-8 rounded-lg bg-soft-gray flex items-center justify-center"><User className="w-4 h-4" /></div>
                             {order.fullName}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Documento & Contato</div>
                          <div className="space-y-1">
                             <div className="flex items-center gap-2 font-semibold text-soft-black">
                                <Hash className="w-4 h-4 text-text-gray" /> {order.cpf}
                             </div>
                             <div className="flex items-center gap-2 font-bold text-brand-primary">
                                <Phone className="w-4 h-4" /> {order.phone}
                                <a 
                                  href={getWhatsAppLink(order.phone, order.fullName)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm flex items-center gap-1.5 text-[10px]"
                                >
                                  <MessageCircle className="w-3 h-3" /> WhatsApp
                                </a>
                             </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Método Pagto</div>
                          <div className="inline-flex px-5 py-2 bg-brand-accent/10 rounded-xl font-black text-brand-accent uppercase tracking-widest text-[11px] border border-brand-accent/10">
                              {order.paymentMethod}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-black/[0.04]">
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-brand-primary/[0.05] flex items-center justify-center shrink-0">
                               <MapPin className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div className="space-y-1">
                               <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Endereço de Entrega/Cobrança</div>
                               <div className="text-soft-black font-medium text-sm leading-relaxed">
                                  {order.address}, {order.neighborhood} <br />
                                  <span className="font-bold">{order.city} — {order.zipCode}</span>
                                  {order.complement && (
                                    <div className="mt-1 text-brand-accent font-bold italic">
                                       Complemento: {order.complement}
                                    </div>
                                  )}
                                </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : activeTab === 'contacts' ? (
                contacts.map(contact => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={contact.id} 
                    className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-black/[0.03] group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 gradient-brand rounded-[22px] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-brand-primary/20">
                          {contact.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <div className="text-xl font-bold text-soft-black leading-none">{contact.name}</div>
                          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-gray">
                            <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-brand-primary" /> {contact.email}</div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-primary" /> {contact.phone}</div>
                              <a 
                                href={getWhatsAppLink(contact.phone, contact.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm flex items-center gap-1.5 text-[10px]"
                              >
                                <MessageCircle className="w-3 h-3" /> WhatsApp
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-[11px] font-bold text-text-gray bg-soft-gray px-4 py-1.5 rounded-full">
                          {formatDate(contact.createdAt)}
                        </div>
                        <button 
                            onClick={() => setConfirmDelete({ id: contact.id, collection: 'contacts' })}
                            className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                        >
                           <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-black/[0.02] text-text-gray font-medium leading-relaxed relative overflow-hidden group/message transition-all">
                       <div className="absolute top-0 right-0 p-3 opacity-10">
                          <MessageSquare className="w-12 h-12" />
                       </div>
                       <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pr-2 custom-scrollbar">
                          {contact.message}
                       </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                partners.map(partner => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={partner.id} 
                    className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-black/[0.03] group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-brand-accent/10 rounded-[22px] flex items-center justify-center text-brand-accent text-xl font-bold">
                          {partner.fullName.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <div className="text-xl font-bold text-soft-black leading-none">{partner.fullName}</div>
                          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-gray">
                            <div className="flex items-center gap-1.5 min-w-[120px]">
                              <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded uppercase tracking-wider text-[9px] font-black">
                                {partner.partnerType.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-brand-primary" /> {partner.email}</div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-primary" /> {partner.phone}</div>
                              <a 
                                href={getWhatsAppLink(partner.phone, partner.fullName)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm flex items-center gap-1.5 text-[10px]"
                              >
                                <MessageCircle className="w-3 h-3" /> WhatsApp
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-[11px] font-bold text-text-gray bg-soft-gray px-4 py-1.5 rounded-full">
                          {formatDate(partner.createdAt)}
                        </div>
                        <button 
                            onClick={() => setConfirmDelete({ id: partner.id, collection: 'partners' })}
                            className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                        >
                           <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {partner.observations && (
                      <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-black/[0.02] text-text-gray font-medium leading-relaxed relative overflow-hidden group/message transition-all">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Handshake className="w-12 h-12" />
                        </div>
                        <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pr-2 custom-scrollbar">
                            {partner.observations}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {(activeTab === 'orders' ? orders : activeTab === 'contacts' ? contacts : partners).length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-24 rounded-[48px] text-center space-y-6 border-2 border-dashed border-black/5"
              >
                <div className="bg-soft-gray w-20 h-20 rounded-full mx-auto flex items-center justify-center text-gray-300">
                   {activeTab === 'orders' ? <ShoppingBag className="w-10 h-10" /> : activeTab === 'contacts' ? <MessageSquare className="w-10 h-10" /> : <Handshake className="w-10 h-10" />}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-soft-black">Nada por aqui ainda...</h3>
                  <p className="text-text-gray text-lg max-w-sm mx-auto">Os novos registros aparecerão automaticamente nesta central.</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Confirmação customizado */}
      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete(null)}
              className="absolute inset-0 bg-soft-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[32px] p-10 text-center space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-soft-black">Tem certeza?</h3>
                <p className="text-text-gray">Esta ação não pode ser desfeita. O registro será excluído permanentemente do banco de dados.</p>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleDelete}
                  className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-colors"
                >
                  Sim, Excluir Registro
                </button>
                <button 
                  onClick={() => setConfirmDelete(null)}
                  className="w-full py-4 bg-soft-gray text-text-gray rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
