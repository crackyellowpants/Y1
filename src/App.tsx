import React, { useState, useRef, useEffect } from 'react';
import { Map, Image as ImageIcon, Book, Copy, ChevronDown, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ASSET_BASE = 'https://raw.githubusercontent.com/crackyellowpants/Y1/main/';
const getAssetUrl = (filename: string) => `${ASSET_BASE}${encodeURIComponent(filename)}`;

const MAP_POINTS = [
  { name: '감숙', x: 704, y: 416, info: '공동파는 곤륜칠웅 승천 후 문주를 잃은 곤륜파의 잔당들이 세운 문파입니다.' },
  { name: '강소', x: 956, y: 443, info: '천하가 난세에 돌입하자 천마태평교가 기승을 부립니다.' },
  { name: '광동', x: 862, y: 639, info: '신선 민세강이 해적들을 교화하여 세운 문파입니다.' },
  { name: '내몽고', x: 907, y: 216, info: '선우 묵화린이 이끄는 강력한 유목 국가 해나라의 영토입니다.' },
  { name: '북경', x: 906, y: 304, info: '나이 어린 선통제를 쥐고 흔드는 간신 사마탁에 의해 망조가 들었습니다.' },
  { name: '사천', x: 674, y: 507, info: '청성파의 잔당들이 세운 점창파와 청성파의 희생자들이 세운 아미파가 있습니다.' },
  { name: '상해', x: 997, y: 493, info: '사파제일인 독암패후 주성아의 고향입니다.' },
  { name: '섬서', x: 773, y: 436, info: '신선 팽리방의 무당파, 길화선의 화산파, 채용아의 종남파가 있습니다.' },
  { name: '요녕', x: 1019, y: 278, info: '고나라 왕 치우가 600년만에 환생하여 졸본에 등장했습니다.' },
  { name: '장강', x: 789, y: 498, info: '국주 태곤이 이끄는 장강해표국이 있습니다.' },
  { name: '중경', x: 743, y: 527, info: '녹림이 장악한 도시입니다.' },
  { name: '청해', x: 573, y: 399, info: '곤륜파는 현재 멸문하였으나 과거 삼대문파 중 으뜸이었습니다.' },
  { name: '하남', x: 854, y: 437, info: '가장 오래된 문파 중 하나인 소림사는 과거 삼대문파, 현재 구파일방의 일원이자 요살들의 인기 많은 유학지입니다.' },
  { name: '하북', x: 890, y: 344, info: '인간으로 남은 유일한 곤륜칠웅, 아사거가 설립한 개방이 있습니다.' },
  { name: '호남', x: 829, y: 557, info: '좋은 기운으로 인재들을 끌어모으는 형산파가 있습니다.' },
  { name: '황하', x: 771, y: 289, info: '국주 서진이 이끄는 황하해표국이 있습니다.' },
];

const START_EXAMPLES = [
  { name: '천진항 도착', image: '웹툰황하의.webp', content: '*천진항에 도착했다. 항구에는 사람들이 가득하다. 물건을 나르는 인부들, 인부들을 밀치며 성질 내는 부자들, 부자들 주머니를 슬쩍하는 거지들까지 다양한 인간군상이 한 데 모여 살아가고 있다. 고급스러운 검은색 복식을 한 사내가 이쪽으로 다가선다. 행색을 보아하니 검문관인 듯하다. 비린내나는 뱃머리까지 내려 올 신분이 아닌 것이 분명하지만, 정세가 어지럽고 민심은 바닥을 치니, 일종의 보여주기식 행정의 일부임이 분명하다. 이미 한 사람을 옆의 포졸이 붙잡아놓고는 으름장을 놓고 있다.*' },
  { name: '고나라에서 망명', image: '웹툰치우.webp', content: '*처음 보는 얼굴들이 궁에 들어와서 알 수 없는 말을 한다. 본인들이 600년 전에 봉인되었다가 풀려난 치우의 신하들이라고 한다. 치우라고 하면, 과거 학나라에 저항하다 죽었다고 했던 고대의 왕을 말하는 것일 테다. 복수를 꿈꾸며 환륜신공을 통해 열 갑자를 뛰어넘어 부활한다고 했다는 전설 속의 인물이다. 그런데 지금 고나라 왕은 난데? 어처구니 없는 사이비 놈들이라고 생각했지만, 이후 붉은 피부를 한 비범한 사내가 따라 들어왔다. 이후 호쾌한 치우께서는 감사하게도 내 목을 치지 않고 추방하는 것에 그치셨다. 한참을 고생하다 북경에 도착하였다.*' },
  { name: '묵화린의 노예', image: '웹툰묵화린.webp', content: '*나는 전대 선우 묵로의 부관이었다. 드디어 출세길이 열리나 하였으나, 그의 딸 묵화린이 묵로를 죽여버렸다. 곧바로 다른 신하들은 잔혹하게 숙청당했고, 다행인지 불행인지 나는 목숨을 잃지 않은 채로 묵화린의 장난감으로 전락했다. 묵화린이 말똥을 밟은 신발로 툭툭 건드리거나, 개밥그릇에 씹다 뱉은 고기를 던져 줄 때도 웃으며 화답해야 했다. 인간의 언어를 쓰는 순간 주먹이 날아왔다. 개처럼 짖는 법을 터득하는 일은 오래 걸리지 않았다. 반항할 수도 없다. 그녀는, 역사상 유일무이한 최강최흉의 존재였기 때문이다. 천문과 수문을 아주 크게 타고난 재앙과도 같은 인간이었다. 하늘과 땅과 늑대의 딸, 그녀를 절대 거역할 수 없다. 죽음조차 허락되지 않는다.*' },
  { name: '개방 입문', image: '웹툰개방.webp', content: '*하북의 저잣거리에 우스꽝스러운 소문이 들려온다. 얼마 전, 스스로 상국의 자리에 오른 간신 사마탁이 비싼 생선 요리를 먹기 위해 하북의 상점가에 들렀다. 근데 웬걸, 벌레가 지나가는 소리가 스쳤는데, 지갑이 사라져버리는 것 아니겠나. 사마탁은 열이 올라서 허공에다 성질을 냈다고 한다. 그러자 이번엔 모자가 사라졌다. 그 후엔 발가벗겨질 때까지 옷을 다 도둑질당했다는 것이다. 옆에서 호위하던 놈은 뭐했냐고? 전국 최강의 살수라 불리는 조망인데, 아주 그냥 둘이서 알몸으로 궁으로 돌아갔다는 것이다. 잡히면 극형에 처하겠지만, 잡을 수 없을 것이다. 사람들은 이미 다 알고 있다. 그게 홍배의 짓이라는 것을. 나도 개방 시켜달라 할 것이다.*' },
  { name: '소림사 입문', image: '웹툰소림사.webp', content: '*소림사에서 사건이 하나 터졌다. 갱갑대사 맥아류고가 어린 제자와 함께 고기를 구워먹다 피돌대사에게 들켰다는 것 아니겠나. 둘은 지옥훈련을 명분으로 실컷 얻어맞는 중이었다. 피돌대사는 아마 자기만 빼놓고 먹은 것이 화가 나서 그랬을 것이라는 게 중론이다. 아무튼, 온 몸에 성한 데가 없을 정도로 시달리던 두 사람이 묘책을 낸다. 사실, 아두리파의 묘책이긴 하다. 얼마 전 요살 해리와 내기 장기를 두었는데, 도저히 요계의 법도로는 영민한 동자승의 꼼수를 이겨낼 재간이 없었다는 것이다. 굴욕적인 패배를 당한 해리는 아두리파에게 소원권을 하나 줬다. 그리고 나는 원래 해리 요살의 보좌였으나, 소원권에 의해 소림사의 제자로 가게 된 형국이다.*' },
  { name: '무당파 입문', image: '웹툰무당파.webp', content: '*구파일방 최약체를 뽑으라면 여러 곳에서 들고 일어나겠지만, 최강을 뽑으라면 다들 군말 없이 무당파를 뽑을 것이다. 그도 그럴 것이, 무당파의 문주 팽완은 너무나도 강력하기 때문이다. 반천은 매번 팽완에게 대들어보지만 한 번도 당해내질 못했다고 한다. 반천도 이미 다른 문파의 문주들과 비견될 만한 강자인데도, 그 정도의 수준 차이가 난다는 것은 어마어마한 일이다. 더욱 무시무시한 것은, 지독한 팽완의 성정이다. 제자의 수준이 만족스럽지 않으면 급여를 주지 않는다고 한다. 그리고 그가 만족한 제자는 여태 한 명도 없었다. 이런 비합리적인 문파에 막내로 들어가게 되었다. 그리고 지금, 반천의 주도 하에 항운 사형과 셋이서 팽완의 금고를 털러 왔다. 그나마 항운 사저는 멀쩡한 것 같은데, 이 미친 인간들 사이에서 살아남을 수 있을까?*' },
  { name: '화산파 입문', image: '웹툰화산파.webp', content: '*매화 향이 가득한 화산... 은 아니고, 매실주 담그는 냄새가 가득한 화산이다. 이번에 중경에서 엄청 큰 주문이 들어왔는데, 중경은 녹림 본거지로 유명한 극악의 치안을 자랑하는 도시다. 그런데 겁도 없이 여수 사형이 나를 데리고 배달을 다녀온다는 것이었다. 분명 술 팔고 남은 돈이 탐난 것이겠지. 아무튼 그렇게 출발했는데, 결국 중경 땅은 밟아보지도 못한 채 도적들한테 약탈당하고, 심지어 여수 사형은 포로로 잡혀가버렸다. 꼴에 사형이라고 막내를 보내주는 조건으로 잡혀 들어갔는데, 그냥 내가 도망을 잘 간 것이고 여수 사형은 느려터졌을 뿐이다. 여온 문주께서는 화산 아래의 한 주점에 계셨다. 꾀죄죄한 꼴로 그간의 일들을 설명하니, 그냥 나보고 수행해서 강해진 다음 여수 사형을 구해오라신다. 너무한 것 아닌가?!*' },
  { name: '종남파 입문', image: '웹툰종남파.webp', content: '*올해는 여름이 늦게 왔다. 문파에 들어온 지 일주일 째, 수련도 중요하지만 더 중요한 것은 생업이다. 종남파의 주 수입원은 쪽풀에서 나온 푸른 염료다. 오늘은 유난히 덥다. 자꾸 화산파를 이겨먹는 데만 집착하는 탕연 문주님에 지친 양화 사저는 버럭 성질을 냈다. 위지 사저도 항상 온화한 표정이지만 땀을 뻘뻘 흘리시더니 자꾸 험한 말실수를 하신다. 뻘쭘해진 문주께선 그래도 화산에게 질 수는 없다 하시며, 나에게 특별 임무를 내리셨다. 양화 사저가 한심한 눈빛으로 바라봤지만, 아랑곳하지 않고 내려진 임무는 바로, 화산파 매실주 장독대 깨부수기였다.*' },
  { name: '점창파 입문', image: '웹툰점창파.webp', content: '*점창파의 점창봉인관에는 사흉 궁기가 봉인되어있다. 요즘 들어 궁기의 기운이 심상치 않다고 하종 문주께서 운을 띄우셨다. 곡춘 사형은 눈치없게도 계속 말대꾸를 하였으나, 석운대사는 꾹 참으며 말을 이어갔다. 계문 사저와 눈치를 보다가 곡춘 사형이 결정타를 날려버렸다. 그의 무심한 한마디에 문주께선 완전히 넋이 나가버렸다. 곡춘 사형이 쫄리셔서 그런 것 이해한다고 자존심을 긁는 발언을 한 것이다. 물론 사형은 원래 반쯤 감정이 존재하지 않는 인간이라, 딱히 조롱하려는 의미는 아니었겠지만... 이후로 문주께서는 곡춘 사형과의 대화를 포기하셨다. 단단히 화가 나신 건지, 자꾸 계문 사저와 나에게만 비밀스런 무공과 사술을 알려주려고 한다.*' },
  { name: '아미파 입문', image: '웹툰아미파.webp', content: '*나는 기원사의 초짜 승려다. 이번에 아미파의 초청을 받아서 요살 사우님과 신려님을 모시고 천축에서 먼 길을 떠나왔다. 아미파 장로들의 환대를 받으며 짐을 풀었다. 요살 신려님은 목에 거대한 족쇄를 차고 계시는데, 인간에게 적대적인 행동을 할 때마다 강한 고통을 느끼게 하는 도술이 걸려있다나 뭐라나. 요살 사우님 말로는 오래 전 소림 피돌대사의 삼촌 되시는 분과 대결에서 패하고 저렇게 되었다고 한다. 사우님은 새로운 사람들을 만날 때마다 신려님의 부끄러운 일화들을 조롱하며 장난을 치시곤 하였다. 신려님께서는 평소의 거친 모습과는 달리 부끄러워 하시며 그만하라고 애원하시곤 했다. 별 일 없다면 이대로 소림사까지 함께 여행할 듯 싶다.*' },
  { name: '공동파 입문', image: '웹툰공동파.webp', content: '*시장에서 물건을 파는 중이었다. 마침 서역의 상인들이 떼거지로 들어오는 시기라서, 바쁜 시간을 보내고 있었다. 그러던 중, 꼬질꼬질한 모습을 한 꼬마 털복숭이가 말을 걸어왔다. 장난감들이 신기했는지 이것저것 고르더니, 공동파의 공손현님 이름으로 외상을 해달라는 것 아닌가. 이제 보니 복장이 더럽긴 했어도 공동파의 도복임이 틀림없었다. 전국에서 제일 돈 많은 문파로 유명한 공동파 소속이니, 옳다구나 하고 여럿 팔아먹을 심산이었다. 그 때였다, 멀리서 눈물을 흘리며 도철을 찾아 부르짖는 공손현님의 모습이 보였다. 이내 꼬마를 발견하시더니 매섭게 뛰어오기 시작했다. 이 녀석이 도철인가? 붙잡으라고 하시는데... 도철이라면 그 전설 속의 사흉 아닌가? 괜히 화를 입는 게 아닐까? 일단 붙잡아 보자!*' },
  { name: '형산파 입문', image: '웹툰형산파.webp', content: '*형산파에 입문한 지 얼마 되지도 않았는데 대형 사건이 터졌다. 사실 우리 문주님은 나이에 비해 굉장히 철이 없으시다. 속되게 푼수떼기라고 해야 하나. 오늘도 밀린 업무는 뒷전으로 하고 당이 부족하다시며 단골 탕후루가게로 훌러덩 가버리셨다. 가게에는 매우 똑똑한 남매가 있었는데, 영지는 영리하여 웅 사부 비위를 맞추며 언니라고 부르곤 하였다. 목이 녀석은 버르장머리 없이 아줌마라고 부르다가 꿀밤을 맞기 일쑤였다. 아무튼, 그렇게 탕후루를 맛있게 드시다가, 어떤 젊은 놈이 구름을 타고 하늘에서 내려오더니, 사부님을 웅비라고 불렀다는 것이다. 곧 시뻘건 덩치 큰 사내가 나타나서는, 집에 가자 그러면서 문주님을 끌어안고 데려가버렸다고 한다. 사부님은 저항도 없이 그냥 따라가신 모양이다. 무슨 사연이 있는 것일까? 기억을 잃은 연인이라도 된다는 건가?*' },
  { name: '해남파 입문', image: '웹툰해남파.webp', content: '*시장에서 저녁거리를 찾고 있을 때였다. 정신머리 없어 보이는 영감이 대뜸 나에게 수련을 안 하고 여기서 뭐하냐고 일갈하는 것이었다. 복장을 보아하니 해남파의 어르신인 듯 하였다. 나는 대충 얼버무리고 가려고 하는데, 죽일 기세로 막아서는 것이다! 쩔쩔매다 보니, 해남파의 여제자 두 분이 오셨다. 잘 구슬려서 모시고 가는가 했더니, 이번에는 진짜 제자들을 못 알아보고 해적들이라며 싸그리 죽여버린다는 것이 아닌가! 둘 중 언니 되어 보이는 여자가 그냥 나보고 며칠만 제자로 지내라고 해서 일단 그렇게 해야 할 것 같다. 영감님이 정신이 돌아오실 때까지만 지내라고 하는데, 힘든 수련을 시키기라도 하면 어떡하지 걱정이 된다.*' },
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
