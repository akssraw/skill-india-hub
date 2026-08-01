import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

/**
 * Accordion — smooth height-animated expand/collapse.
 * Uses GSAP for buttery smooth height transition.
 */
const AccordionItem = ({ question, answer, isOpen, onToggle, index }) => {
  const contentRef = useRef(null);

  const handleToggle = () => {
    const el = contentRef.current;
    if (!el) return;

    if (!isOpen) {
      // Open: animate height from 0 to auto
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    } else {
      // Close: animate height to 0
      gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: 'power2.in' });
    }

    onToggle(index);
  };

  return (
    <div className={`border border-slate-200 rounded-2xl overflow-hidden transition-shadow duration-200 ${isOpen ? 'shadow-medium' : ''}`}>
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors duration-150"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-900 text-base pr-4">{question}</span>
        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary-500 text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}>
          <ChevronDown size={16} />
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ height: isOpen ? 'auto' : 0, overflow: 'hidden', opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 pb-5 text-slate-600 leading-relaxed text-sm border-t border-slate-100 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <AccordionItem
          key={item.id || i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === i}
          onToggle={handleToggle}
          index={i}
        />
      ))}
    </div>
  );
};

export default Accordion;
