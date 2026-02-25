import React, { useState, useRef, useEffect } from 'react';
import { Map, Image as ImageIcon, Book, Copy, ChevronDown, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ASSET_BASE = 'https://raw.githubusercontent.com/crackyellowpants/Y1/main/';
const getAssetUrl = (filename: string) => `${ASSET_BASE}${encodeURIComponent(filename)}`;

const MAP_POINTS = [
  { name: '감숙의 공동파', x: 704, y: 416, info: '곤륜칠웅 승천 후 문주를 잃은 곤륜파의 잔당들이 세운 문파입니다.' },
  { name: '강소의 천마태평교', x: 956, y: 443, info: '천하가 난세에 돌입하자 천마태평교가 기승을 부립니다.' },
  { name: '광동의 해남파', x: 862, y: 639, info: '신선 민세강이 해적들을 교화하여 세운 문파입니다.' },
  { name: '해나라', x: 907, y: 216, info: '선우 묵화린이 이끄는 강력한 유목 국가입니다.' },
  { name: '학나라', x: 906, y: 304, info: '나이 어린 선통제를 쥐고 흔드는 간신 사마탁에 의해 망조가 들었습니다.' },
  { name: '사천의 점창파, 아미파', x: 674, y: 507, info: '청성파의 잔당들이 세운 점창파와 청성파의 희생자들이 세운 아미파가 있습니다.' },
  { name: '상해의 주성아', x: 997, y: 493, info: '사파제일인 독암패후 주성아의 고향입니다.' },
  { name: '섬서의 무당파, 화산파, 종남파', x: 773, y: 436, info: '신선 팽리방의 무당파, 길화선의 화산파, 채용아의 종남파가 있습니다.' },
  { name: '고나라', x: 1019, y: 278, info: '고나라 왕 치우가 600년만에 환생하여 졸본에 등장했습니다.' },
  { name: '장강의 장강해표국', x: 789, y: 498, info: '국주 태곤이 이끄는 장강해표국입니다.' },
  { name: '중경의 녹림', x: 743, y: 527, info: '녹림이 장악한 도시입니다.' },
  { name: '청해의 곤륜파', x: 573, y: 399, info: '현재는 멸문하였으나 과거 삼대문파 중 으뜸이었습니다.' },
  { name: '하남의 소림사', x: 854, y: 437, info: '가장 오래된 문파 중 하나인 소림사는 과거 삼대문파, 현재 구파일방의 일원이자 요살들의 인기 많은 유학지입니다.' },
  { name: '하북의 개방', x: 890, y: 344, info: '인간으로 남은 유일한 곤륜칠웅, 아사거가 설립한 개방입니다.' },
  { name: '호남의 형산파', x: 829, y: 557, info: '좋은 기운으로 인재들을 끌어모으는 형산파입니다.' },
  { name: '황하의 황하해표국', x: 771, y: 289, info: '국주 서진이 이끄는 황하해표국입니다.' },
];

const START_EXAMPLES = [
  { name: '천진항 도착', image: '웹툰황하의.webp', content: '천진항에 도착한 주인공 일행은 새로운 여정을 시작한다. 바닷바람이 거세게 부는 가운데, 정체를 알 수 없는 무리들이 그들의 뒤를 쫓기 시작하는데...' },
  { name: '고나라에서 망명', image: '웹툰치우.webp', content: '고나라의 멸망과 함께 망명길에 오른 왕족들. 험난한 여정 속에서 잃어버린 무공 비급을 되찾기 위한 처절한 싸움이 벌어진다.' },
  { name: '묵화린의 노예', image: '웹툰묵화린.webp', content: '사파의 거두 묵화린에게 붙잡혀 노예로 전락한 주인공. 굴욕적인 나날 속에서도 복수의 칼날을 갈며 탈출의 기회를 엿본다.' },
  { name: '개방 입문', image: '웹툰개방.webp', content: '천하제일방 개방에 입문하여 거지들과 동고동락하게 된 사연. 타구봉법의 진수를 깨우치기 위한 험난한 수련이 시작된다.' },
  { name: '소림사 입문', image: '웹툰소림사.webp', content: '무공의 태산북두 소림사에 동자승으로 입문. 칠십이종 절기를 익히며 불심과 무심의 경계를 넘나드는 깨달음의 길을 걷는다.' },
  { name: '무당파 입문', image: '웹툰무당파.webp', content: '태극의 묘리를 깨우치기 위해 무당파에 입문한 주인공. 부드러움으로 강함을 제압하는 검의 극의를 향해 나아간다.' },
  { name: '화산파 입문', image: '웹툰화산파.webp', content: '매화가 흩날리는 화산파에서 검을 쥐다. 쇠락해가는 문파를 부흥시키기 위한 후기지수의 눈부신 활약이 펼쳐진다.' },
  { name: '종남파 입문', image: '웹툰종남파.webp', content: '천하삼십육검의 명맥을 잇는 종남파. 잃어버린 검보를 되찾고 과거의 영광을 재현하기 위한 고군분투가 시작된다.' },
  { name: '점창파 입문', image: '웹툰점창파.webp', content: '사일검법으로 유명한 점창파에 입문. 쾌검의 진수를 보여주며 무림에 새로운 바람을 불러일으킨다.' },
  { name: '아미파 입문', image: '웹툰아미파.webp', content: '여성들만의 문파 아미파에 얽힌 기이한 인연. 속세의 번뇌를 끊고 무도의 길을 걷는 여협들의 이야기.' },
  { name: '공동파 입문', image: '웹툰공동파.webp', content: '복마검법의 전승지 공동파. 마교의 위협에 맞서 정파의 방패가 되기 위한 치열한 수련이 이어진다.' },
  { name: '형산파 입문', image: '웹툰형산파.webp', content: '음악과 무공이 어우러진 형산파. 검에 실린 애절한 선율이 강호의 피바람을 잠재울 수 있을 것인가.' },
  { name: '해남파 입문', image: '웹툰해남파.webp', content: '남해의 외딴 섬에 위치한 해남파. 독자적인 검법을 완성하고 중원 무림에 진출하기 위한 야망이 꿈틀거린다.' },
];

const LONG_TERM_MEMORIES = [
  {
    title: '천마신교의 태동',
    content: '과거 십만대산에서 발원한 천마신교는 중원을 피로 물들였다. 초대 천마의 압도적인 무공 앞에 정파와 사파 모두 무릎을 꿇어야만 했다. 그들의 목적은 오직 무림 일통이었으며, 이를 위해 수많은 문파가 멸문지화를 당했다.',
  },
  {
    title: '검존의 마지막 유언',
    content: '"검은 마음을 비추는 거울이니, 마음이 굽으면 검 또한 굽는다." 화산파의 전설적인 검존이 남긴 이 한마디는 후기지수들에게 큰 깨달음을 주었다. 그는 마교와의 최후의 결전에서 홀로 수백의 마인을 베고 장렬히 전사했다.',
  },
  {
    title: '혈교의 부활 징조',
    content: '최근 강호 곳곳에서 기이한 실종 사건이 연이어 발생하고 있다. 특히 음기가 강한 날 밤, 붉은 옷을 입은 자들이 목격되었다는 소문이 파다하다. 이는 백 년 전 멸망한 것으로 알려진 혈교가 다시 암약하고 있다는 증거일지도 모른다.',
  },
  {
    title: '무당파 태극혜검의 비밀',
    content: '무당파의 진산절기인 태극혜검은 음양의 조화를 극의로 삼는다. 강함 속에 부드러움이 있고, 부드러움 속에 강함이 숨어 있어 적의 공격을 흘려내면서 동시에 치명적인 반격을 가할 수 있다. 이를 완벽히 익힌 자는 당대 무림에 세 명을 넘지 않는다.',
  },
];

function AccordionItem({ title, content }: { title: string, content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);

  const handleCopyTitle = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(title);
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 2000);
  };

  const handleCopyContent = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(content);
    setCopiedContent(true);
    setTimeout(() => setCopiedContent(false), 2000);
  };

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 mb-4">
      <div
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/10 transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyTitle}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
            title="Copy title"
          >
            {copiedTitle ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="text-xs font-medium">제목</span>
          </button>
          <span className="font-medium text-lg text-white">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyContent}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
            title="Copy content"
          >
            {copiedContent ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="text-xs font-medium">내용</span>
          </button>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 pt-2 text-gray-300 leading-relaxed relative group">
              <p className="pr-12 whitespace-pre-wrap">{content}</p>
              <button
                onClick={handleCopyContent}
                className="absolute top-2 right-6 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
                title="Copy to clipboard"
              >
                {copiedContent ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MapView() {
  const [selectedLocation, setSelectedLocation] = useState<typeof MAP_POINTS[0] | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    }
  }, []);

  const handlePrev = () => {
    if (!selectedLocation) return;
    const currentIndex = MAP_POINTS.findIndex(p => p.name === selectedLocation.name);
    const prevIndex = (currentIndex - 1 + MAP_POINTS.length) % MAP_POINTS.length;
    setSelectedLocation(MAP_POINTS[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedLocation) return;
    const currentIndex = MAP_POINTS.findIndex(p => p.name === selectedLocation.name);
    const nextIndex = (currentIndex + 1) % MAP_POINTS.length;
    setSelectedLocation(MAP_POINTS[nextIndex]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 sm:gap-6">
      <div ref={scrollContainerRef} className="w-full overflow-auto rounded-2xl border border-white/10 shadow-2xl bg-black/50 scrollbar-hide">
        <div className="relative w-[150%] md:w-full aspect-[1408/768]">
          <img 
            src={getAssetUrl('map.webp')} 
            alt="무림지도" 
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/map/1408/768?blur=2';
            }}
          />
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1408 768" preserveAspectRatio="xMidYMid meet">
            {MAP_POINTS.map((point, idx) => (
              <g 
                key={idx} 
                transform={`translate(${point.x}, ${point.y})`} 
                className="group cursor-pointer"
                onClick={() => setSelectedLocation(point)}
              >
                <text 
                  y="0" 
                  alignmentBaseline="middle"
                  textAnchor="middle" 
                  fill={selectedLocation?.name === point.name ? "#fcd34d" : "white"} 
                  className={`text-xl md:text-2xl font-bold drop-shadow-md transition-all duration-300 ${selectedLocation?.name === point.name ? 'scale-125' : 'opacity-90 group-hover:opacity-100 group-hover:scale-110 group-hover:text-yellow-200'}`}
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.8)' }}
                >
                  {point.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedLocation && (
          <motion.div
            key={selectedLocation.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl flex items-center justify-between gap-2 sm:gap-4"
          >
            <button 
              onClick={handlePrev}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <div className="flex-1 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{selectedLocation.name}</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-lg">
                {selectedLocation.info}
              </p>
            </div>

            <button 
              onClick={handleNext}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExamplesView() {
  const [activeExample, setActiveExample] = useState(START_EXAMPLES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeExample.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full">
        <div className="flex overflow-x-auto scrollbar-hide gap-1.5 sm:gap-2 bg-white/5 p-1.5 sm:p-2 rounded-2xl border border-white/10">
          {START_EXAMPLES.map((example) => (
            <button
              key={example.name}
              onClick={() => setActiveExample(example)}
              className={`whitespace-nowrap flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeExample.name === example.name
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeExample.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col gap-6"
        >
          <div className="w-screen relative left-1/2 -translate-x-1/2 sm:w-full sm:static sm:translate-x-0 sm:left-auto bg-black/50 sm:rounded-2xl overflow-hidden sm:border border-white/10">
            <img 
              src={getAssetUrl(activeExample.image)} 
              alt={activeExample.name}
              className="w-full h-auto block"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${activeExample.name}/800/1200`;
              }}
            />
          </div>
          
          <div className="w-full pb-8">
            <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 relative p-4 sm:p-6">
              <p className="text-gray-300 leading-relaxed pr-20 sm:pr-24 whitespace-pre-wrap text-sm sm:text-base">{activeExample.content}</p>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 sm:top-4 sm:right-6 flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
                title="Copy content"
              >
                {copied ? <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
                <span className="text-xs sm:text-sm font-medium">내용 복사</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MemoryView() {
  return (
    <div className="max-w-3xl mx-auto w-full">
      {LONG_TERM_MEMORIES.map((memory, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <AccordionItem title={memory.title} content={memory.content} />
        </motion.div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'examples' | 'memory'>('map');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-white/20">
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={getAssetUrl('logo.webp')} 
                alt="Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            
            <nav className="flex items-center gap-1 sm:gap-2 bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full scrollbar-hide">
              <button
                onClick={() => setActiveTab('map')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'map' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                무림지도
              </button>
              <button
                onClick={() => setActiveTab('examples')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'examples' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                시작예시
              </button>
              <button
                onClick={() => setActiveTab('memory')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'memory' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Book className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                장기기억
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'map' && <MapView />}
            {activeTab === 'examples' && <ExamplesView />}
            {activeTab === 'memory' && <MemoryView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
