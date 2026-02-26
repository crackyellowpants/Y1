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
  { name: '화산파 입문', image: '웹툰화산파.webp', content: '*매화 향이 가득한 화산... 은 아니고, 매실주 담그는 냄새가 가득한 화산이다. 이번에 중경에서 엄청 큰 주문이 들어왔는데, 중경은 녹림 본거지로 유명한 극악의 치안을 자랑하는 도시다. 그런데 겁도 없이 여수 사형이 나를 데리고 배달을 다녀온다는 것이었다. 분명 술 팔고 남은 돈이 탐난 것이겠지. 아무튼 그렇게 출발했는데, 결국 중경 땅은 밟아보지도 못한 채 도적들한테 약탈당하고, 심지어 여수 사형은 포로로 잡혀가버렸다. 꼴에 사형이라고 막내를 보내주는 조건으로 잡혀 들어갔는데, 그냥 내가 도망을 잘 간 것이고 여수 사형은 느려터졌을 뿐이다. 여온 문주께서는 화산 아래의 한 주점에 계셨다. 꾀죄죄한 꼴로 그간의 일들을 설명하니, 그냥 나보고 수행해서 강해진 다음 여수 사형을 구해오라신다. 여진 사저는 자기 사제가 잡혀갔는데도 딱히 관심이 없어 보인다. 너무한 것 아닌가?!*' },
  { name: '종남파 입문', image: '웹툰종남파.webp', content: '*올해는 여름이 늦게 왔다. 문파에 들어온 지 일주일 째, 수련도 중요하지만 더 중요한 것은 생업이다. 종남파의 주 수입원은 쪽풀에서 나온 푸른 염료다. 오늘은 유난히 덥다. 자꾸 화산파를 이겨먹는 데만 집착하는 탕연 문주님에 지친 양화 사저는 버럭 성질을 냈다. 위지 사저도 항상 온화한 표정이지만 땀을 뻘뻘 흘리시더니 자꾸 험한 말실수를 하신다. 뻘쭘해진 문주께선 그래도 화산에게 질 수는 없다 하시며, 나에게 특별 임무를 내리셨다. 양화 사저가 한심한 눈빛으로 바라봤지만, 아랑곳하지 않고 내려진 임무는 바로, 화산파 매실주 장독대 깨부수기였다.*' },
  { name: '점창파 입문', image: '웹툰점창파.webp', content: '*점창파의 점창봉인관에는 사흉 궁기가 봉인되어있다. 요즘 들어 궁기의 기운이 심상치 않다고 하종 문주께서 운을 띄우셨다. 곡춘 사형은 눈치없게도 계속 말대꾸를 하였으나, 석운대사는 꾹 참으며 말을 이어갔다. 계문 사저와 눈치를 보다가 곡춘 사형이 결정타를 날려버렸다. 그의 무심한 한마디에 문주께선 완전히 넋이 나가버렸다. 곡춘 사형이 쫄리셔서 그런 것 이해한다고 자존심을 긁는 발언을 한 것이다. 물론 사형은 원래 반쯤 감정이 존재하지 않는 인간이라, 딱히 조롱하려는 의미는 아니었겠지만... 이후로 문주께서는 곡춘 사형과의 대화를 포기하셨다. 단단히 화가 나신 건지, 자꾸 계문 사저와 나에게만 비밀스런 무공과 사술을 알려주려고 한다.*' },
  { name: '아미파 입문', image: '웹툰아미파.webp', content: '*나는 기원사의 초짜 승려다. 이번에 아미파의 초청을 받아서 요살 사우님과 신려님을 모시고 천축에서 먼 길을 떠나왔다. 아미파 장로들의 환대를 받으며 짐을 풀었다. 요살 신려님은 목에 거대한 족쇄를 차고 계시는데, 인간에게 적대적인 행동을 할 때마다 강한 고통을 느끼게 하는 도술이 걸려있다나 뭐라나. 요살 사우님 말로는 오래 전 소림 피돌대사의 삼촌 되시는 분과 대결에서 패하고 저렇게 되었다고 한다. 사우님은 새로운 사람들을 만날 때마다 신려님의 부끄러운 일화들을 조롱하며 장난을 치시곤 하였다. 신려님께서는 평소의 거친 모습과는 달리 부끄러워 하시며 그만하라고 애원하시곤 했다. 항상 티격태격 하는 것을 보니, 두 분은 오랜 친구인 것 같다. 별 일 없다면 이대로 소림사까지 함께 여행할 듯 싶다.*' },
  { name: '공동파 입문', image: '웹툰공동파.webp', content: '*시장에서 물건을 파는 중이었다. 마침 서역의 상인들이 떼거지로 들어오는 시기라서, 바쁜 시간을 보내고 있었다. 그러던 중, 꼬질꼬질한 모습을 한 꼬마 털복숭이가 말을 걸어왔다. 장난감들이 신기했는지 이것저것 고르더니, 공동파의 공손현님 이름으로 외상을 해달라는 것 아닌가. 이제 보니 복장이 더럽긴 했어도 공동파의 도복임이 틀림없었다. 전국에서 제일 돈 많은 문파로 유명한 공동파 소속이니, 옳다구나 하고 여럿 팔아먹을 심산이었다. 그 때였다, 멀리서 눈물을 흘리며 도철을 찾아 부르짖는 공손현님의 모습이 보였다. 이내 꼬마를 발견하시더니 매섭게 뛰어오기 시작했다. 이 녀석이 도철인가? 붙잡으라고 하시는데... 도철이라면 그 전설 속의 사흉 아닌가? 괜히 화를 입는 게 아닐까? 일단 붙잡아 보자!*' },
  { name: '형산파 입문', image: '웹툰형산파.webp', content: '*형산파에 입문한 지 얼마 되지도 않았는데 대형 사건이 터졌다. 사실 우리 문주님은 나이에 비해 굉장히 철이 없으시다. 속되게 푼수떼기라고 해야 하나. 오늘도 밀린 업무는 뒷전으로 하고 당이 부족하다시며 단골 탕후루가게로 훌러덩 가버리셨다. 가게에는 매우 똑똑한 남매가 있었는데, 영지는 영리하여 웅 사부 비위를 맞추며 언니라고 부르곤 하였다. 목이 녀석은 버르장머리 없이 아줌마라고 부르다가 꿀밤을 맞기 일쑤였다. 아무튼, 그렇게 탕후루를 맛있게 드시다가, 어떤 젊은 놈이 구름을 타고 하늘에서 내려오더니, 사부님을 웅비라고 불렀다는 것이다. 곧 시뻘건 덩치 큰 사내가 나타나서는, 집에 가자 그러면서 문주님을 끌어안고 데려가버렸다고 한다. 사부님은 저항도 없이 그냥 따라가신 모양이다. 무슨 사연이 있는 것일까? 기억을 잃은 연인이라도 된다는 건가?*' },
  { name: '해남파 입문', image: '웹툰해남파.webp', content: '*시장에서 저녁거리를 찾고 있을 때였다. 정신머리 없어 보이는 영감이 대뜸 나에게 수련을 안 하고 여기서 뭐하냐고 일갈하는 것이었다. 복장을 보아하니 해남파의 어르신인 듯 하였다. 나는 대충 얼버무리고 가려고 하는데, 죽일 기세로 막아서는 것이다! 쩔쩔매다 보니, 해남파의 여제자 두 분이 오셨다. 잘 구슬려서 모시고 가는가 했더니, 이번에는 진짜 제자들을 못 알아보고 해적들이라며 싸그리 죽여버린다는 것이 아닌가! 둘 중 언니 되어 보이는 여자가 그냥 나보고 며칠만 제자로 지내라고 해서 일단 그렇게 해야 할 것 같다. 영감님이 정신이 돌아오실 때까지만 지내라고 하는데, 힘든 수련을 시키기라도 하면 어떡하지 걱정이 된다.*' },
];

const LONG_TERM_MEMORIES = [
  {
    title: '문파 상세: 무당파',
    content: '본거지 섬서. 상징색은 흰색. 자타공인 구파일방의 선두주자이자 실질적 우두머리 문파. 소림사는 무당파와 동등한 위상을 주장하지만 무당파는 한 번도 인정한 적이 없다. 전체적으로 자부심이 매우 강한 기조가 존재하며, 그를 뒷받침하듯 전국 최고의 실력자들이 모여 있다. 하지만 일찍이 조정과 정치적으로 긴밀하게 결탁하여 부패하였다. 자신들이 곤륜파의 정통 후계라고 생각하여, 과거 곤륜파 잔당들이 설립한 공동파를 못마땅하게 생각한다. 거기다 공동파는 야망 넘치는 무당파보다 재정적으로 부유하다.',
  },
  {
    title: '문파 상세: 화산파',
    content: '본거지 섬서. 상징색은 보라색. 오래 전부터 종남파와 경쟁하였다. 보검 화종요연을 보유 중이다. 매화나무에서 나는 매실로 술을 담가서 판매하는 사업을 하고 있다. 곤륜칠웅 중 하나였던 신선 길화선이 문파의 시조이며, 종남파의 시조인 신선 채용아와 반목한 것을 계기로 사이가 틀어졌다고 한다. 상대의 기운을 흡수하는 무공을 주로 사용한다.',
  },
  {
    title: '문파 상세: 종남파',
    content: '본거지 섬서. 상징색은 파란색. 오래 전부터 화산파와 경쟁하였다. 보검 산남필인을 보유 중이다. 쪽풀에서 나오는 푸른 염료로 옷을 염색해 판매하는 사업을 하고 있다. 곤륜칠웅 중 하나였던 신선 채용아가 문파의 시조이며, 화산파의 시조인 신선 길화선과 반목한 것을 계기로 사이가 틀어졌다고 한다. 상대의 기운을 회피하는 무공을 주로 사용한다.',
  },
  {
    title: '문파 상세: 소림사',
    content: '본거지 하남. 상징색은 주황색. 구파일방이 결성되기 전부터 존재했던 오래된 문파다. 살생을 하지 않는 것을 제 1 원칙으로 하고 있으며, 쇠붙이를 들고 전투에 임하지 않는 것이 제 2 원칙이다. 학나라가 중원을 평정한 후 600년 간 무당파와 함께 구파일방의 우두머리 역할을 했다. 하지만 오랜 세월 동안 정치적으로 이용당하며 본래의 청렴함이 많이 퇴색되었다.',
  },
  {
    title: '문파 상세: 아미파',
    content: '본거지 사천. 상징색은 주황색. 청성파에 의해 납치당해 마공 연구용 실험을 당하던 여성들이 소림사에 의해 구출된 것이 아미파의 시조라고 한다. 여승들로 이루어져 있으며, 사술과 마공을 배척하는 분위기가 조성되었다. 천축국 기원사의 요살들이 중원으로 유학을 올 때 필수적으로 머무르는 곳이며, 요술에 관해서는 굉장히 해박한 지식을 보유하고 있다.',
  },
  {
    title: '문파 상세: 점창파',
    content: '본거지 사천. 상징색은 검은색과 보라색. 멸문당한 청성파의 잔당들과 운남의 무림인들이 융합하여 탄생한 문파. 사흉을 비롯한 마수들을 봉인하기 위한 점창봉인관이 유명하다. 하지만 청성파 세력들이 주가 되었기에 마공과 사술에 굉장히 호의적이고 활발하게 연구한다. 무공과 다양한 신공들이 결합한 형태의 고유한 기술을 사용하며, 강해질 수 있다면 수단과 방법을 가리지 않기로 유명하다.',
  },
  {
    title: '문파 상세: 공동파',
    content: '본거지 감숙. 상징색은 청록색과 금색. 문주 팽리방이 신선이 된 후, 갈 곳 없던 곤륜파 잔당이 감숙으로 본거지를 옮기고 공동파의 유래가 되었다. 비단길 무역의 요충지에서 상단 호위 용병을 하며 막대한 부를 쌓았다. 교류가 활발한 지역에 있다 보니 분위기가 개방적이고 예술가들이 많다. 다양한 종류의 소수자들이 피난처로 삼고 있으며, 서역 출신 인물들도 종종 보인다.',
  },
  {
    title: '문파 상세: 해남파',
    content: '본거지 광동. 상징색은 남색과 파란색. 남해의 해적들 중 일부가 곤륜칠웅 신선 민세강에 의해 교화되어 세운 문파. 기본적으로 바닷가 사람들인데다 해적 출신들이 많아서 거칠다. 문파가 세워질 때, 본래 지역의 패자였던 광동어가를 몰아내고 일대를 평정하였다. 강렬한 파도의 기세를 본딴 검술을 주로 사용한다. 노략질에 대해 관대한 편이며, 대화가 통하지 않으면 승부로 결판을 짓는 문화가 남아 있다.',
  },
  {
    title: '문파 상세: 형산파',
    content: '본거지 호남. 상징색은 회색. 전국 최대 규모의 산적 연맹이 존재했으나 곤륜칠웅 신선 편아현에 의해 소탕되고, 투항한 일부가 제자로 받아들여져 명맥을 이어간 것이 형산파가 되었다. 살아남은 산적들은 중경에서 세력을 다시 규합하여 녹림이 되었다. 형산은 예로부터 유능한 인재들이 많기로 유명했으며, 어린 나이에 두각을 드러내는 천재들이 많아 형산의 기운을 받기 위한 관광객들이 문전성시를 이룬다. 관광객들을 대상으로 한 탕후루가 지역 명물이다.',
  },
  {
    title: '문파 상세: 개방',
    content: '본거지 하북. 상징색은 녹색. 곤륜칠웅 아사거는 신선이 되는 것을 포기하고 인간으로 남았다. 그는 평생 비단옷을 입지 않았다. 그는 자신의 삶에서 가장 큰 인연이었던 두 사람의 이름을 따서 개방을 만들었다. 아사거는 고아로 태어나 거지로 살다 납치되어 노비가 되었으나 탈출 후 팽리방의 제자가 되었다. 그는 거지들이 스스로를 보호하고 도울 수 있게 하도록 개방을 만들었다. 시간이 지나며 어떠한 교육도 받지 못하는 개방 거지들의 의식 수준은 추락했지만, 그의 가르침은 잊지 않은 채 여전히 개방을 이끌고 있다.',
  },
  {
    title: '세력 상세: 녹림',
    content: '본거지 중경. 상징색은 황록색. 전국에 퍼져 있는 산적들의 연맹으로, 본래 중경에서 주로 활동하였으나 영희제 사후 세력이 전국적으로 확대되었다. 주로 힘 없는 백성들을 대상으로 약탈을 일삼았지만 녹림 맹주 번횡의 주도 하에 다양한 사술을 익혀 지역 문파들에게도 위협적인 존재가 되었다.',
  },
  {
    title: '세력 상세: 장강해표국',
    content: '장강 유역에서 활동하는 해표국. 평범한 운송부터 호위까지 다양한 업무를 수행한다. 겉으로는 일반적인 해운업만 취급하는 것처럼 보이지만, 실상은 그렇지 않다. 불법적인 영약 재료를 유통하기도 하고, 운송비를 불려서 강탈하듯이 취하는 경우도 빈번하다. 하지만 이미 깊게 뿌리 내린 사업이라 조정에서도 쉽게 통제하지 못하고 쉬쉬하는 분위기다.',
  },
  {
    title: '세력 상세: 황하해표국',
    content: '황하 유역에서 활동하는 해표국. 학나라가 전국을 통일하기 전에도 존재했던 아주 오래된 유서 깊은 운송업체다. 당시 국주가 정세를 빠르게 읽어 학나라의 천하통일을 돕게 되면서 입지가 급상승했다. 이후 하북서가의 가족 사업이 되었으며, 대대로 후계를 이으면서 명맥을 유지하였다. 주로 귀족 위주로 호위나 운송을 제공하며, 비밀스러운 해상 연회를 통해 학나라 조정 부패에 일조 중이다.',
  },
  {
    title: '세력 상세: 천마태평교',
    content: '영희제 사후 강소 지역을 중심으로 전국적으로 창궐한 종교. 원래는 토착 신앙이었으나 조직화되면서 세력이 급증하였다. 이들은 인간의 몸에 신선의 기운을 가두어 천마를 탄생시키는 천마신공을 연구하고 실현시키기 위해 죽음도 불사한다. 천마가 어지러운 세상을 단숨에 휩쓸어버리고 평화로운 새 세상을 가져다 줄 것이라고 굳게 믿는다.',
  },
  {
    title: '문파 상세: 곤륜파',
    content: '전국시대 삼대문파 중 으뜸이었던 문파다. 본거지는 청해에 존재했다. 팽리방이 신선이 된 후 지도자를 잃고 자연스럽게 와해되어 다른 문파들에 흡수되었다. 천문을 완벽하게 통달하고 있었던 팽리방이 학나라의 천하통일 이후 천문의 힘을 분산시켜 전수하기 위해 천문을 열 종류의 무공으로 쪼개서 다른 문파들에게 하나씩 전수하였다. 해당 무공을 전수받은 문파들은 구파일방이 되었다.',
  },
  {
    title: '문파 상세: 청성파',
    content: '전국시대 삼대문파 중 하나였다. 팽리방의 호적수였던 토비룡이 이끌던 문파였으며, 사천을 본거지로 했다. 신선이 되기 위해 부정한 방법을 동원하던 토비룡이 팽리방을 비롯한 곤륜칠웅에게 저지되어 사망하면서 청성파도 멸문을 피할 수 없었다. 청성파의 잔당들과 운남에서 온 점창파가 융합하면서 사천의 점창파가 되었다. 청성파는 종종 여성들을 납치하여 마공의 실험체로 삼았고, 청성파 멸문 후 살아남은 희생자들이 소림사의 지원을 받고 세운 문파가 아미파다.',
  },
  {
    title: '세력 상세: 서안무림맹',
    content: '서안에서 정기적으로 회동을 갖는 문파들의 연맹이다. 무당파, 화산파, 종남파, 소림사, 개방이 여기 속해 있으며 맹주는 팽완이다. 부맹주는 반천, 여온, 탕연, 홍배, 맥아류고가 맡고 있다. 하북의 귀족들, 황하해표국의 갑부들, 북경의 고위 인사들도 참여한다.',
  },
  {
    title: '세력 상세: 성도무림맹',
    content: '성도에서 정기적으로 회동을 갖는 문파들의 연맹이다. 점창파, 아미파, 공동파, 해남파, 형산파가 여기 속해 있으며 맹주는 하종이다. 부맹주는 웅선하, 논단노지, 아만논예, 공손현, 원수연이 맡고 있다. 광동의 귀족들, 장강해표국의 거물들, 강소의 사파 고수들도 참여한다.',
  },
  {
    title: '설화: 요계 1',
    content: '오래 전, 귀문이 주가 되는 요괴들의 세상, 요계에서는 다섯 왕이 있었다. 남쪽 적요계의 주작, 서쪽 백요계의 백호, 동쪽 청요계의 청룡, 북쪽 흑요계의 현무, 중앙 황요계의 황제가 그 다섯이었다. 이 중 현무는 그 출생이 기이한데, 서로 다른 뱀 요괴와 거북이 요괴가 요계를 지배하겠다는 야욕을 품고 힘을 합쳐 한 몸을 이룬 것이었다. 하지만, 강력한 두 존재가 서로 주도권을 쥐려고 경쟁하기 시작했고, 이는 아주 강력한 혼란을 발생시킨다. 엄청난 규모의 수문이 발현한 것이다.',
  },
  {
    title: '설화: 요계 2',
    content: '지독한 싸움 끝에 결국 현무가 있던 자리에는 응축된 수문을 지닌 시커먼 덩어리만 남게 되었다. 덩어리는 세 조각으로 분리되었는데, 가장 큰 덩어리는 사흉 혼돈이 되었다. 그리고 중간 덩어리는 안에서 다시 나뉘어져, 보라색 덩어리는 궁기가 되고, 녹색 덩어리는 도올이 되었다. 이후 자그마한 덩어리가 부스러기처럼 떨어져 있었는데, 이를 가엾게 여긴 청룡과 백호가 각각 푸른 숨결과 하얀 털가죽을 주자 덩어리는 도철이 되었다.',
  },
  {
    title: '설화: 요계 3',
    content: '혼돈은 가장 큰 덩어리답게 야망도 대단했는데, 신선이 되길 원했다. 혼돈은 나머지 형제들을 데리고 인간계로 달아났다. 이후 흑요계의 왕 자리는 공석인 채로 오랜 시간이 흘렀다. 사흉 형제들은 인간계에서 팽리방이 이끄는 곤륜칠웅에게 모두 봉인당했다. 곤륜칠웅이 신선이 되어 승천하자 혼돈은 봉인 속에서 매우 격분했다고 한다. 신선이 된 팽리방은 천하통일의 대업을 이룬 학 은공 주상에게 줄 선물을 구하기 위해 여러 세상을 누비고 다녔다. 그러다가 황요계의 황제와 마주치게 되었다.',
  },
  {
    title: '설화: 요계 4',
    content: '팽리방은 도술을 사용해 황제를 검에 가둬버렸다. 그는 인간계로 돌아와 학 은공 주상에게 검을 바쳤다. 검의 이름은 천양검이다. 이후 황제의 이름은 학나라 통치자의 칭호가 되었고, 황요계 황제의 모습을 본따서 학나라 황제가 입는 옷이 만들어졌다. 황요계의 왕 자리도 공석이 되고, 시간이 좀 더 지났다. 환륜신공을 통해 요계에 환생한 치우의 기개를 보고 감복한 적요계의 술단은 적요계 왕 주작의 심장을 뽑아서 치우에게 바쳤다. 이후 치우의 피부는 불게 변했다.',
  },
  {
    title: '설화: 요계 5',
    content: '적요계의 주작도 심장이 뽑혀 죽어 이제 요계에는 청요계의 왕 청룡과 백요계의 왕 백호만이 남았다. 어질고 온화한 성품의 두 왕은 인간들이 요계를 희롱하는 모습을 보고 인간계에 침공하기보다는 그 뛰어남을 배우고자 했다. 이에 두 왕을 필두로 한 12명의 요괴들이 천축의 기원사에 당도하여 가르침을 구했다. 훗날 이들은 요살이라 불리며 많은 이들의 존경을 받게 된다.',
  },
  {
    title: '배경: 육문 1',
    content: '삼라만상은 육문(六紋)으로 구성되어 있다. 천문(天紋), 간문(間紋), 축문(畜紋), 귀문(鬼紋), 수문(修紋), 옥문(獄紋)이다. 하나의 육문을 다른 육문으로 변환하는 일을 신공이라고 하며, 신공을 행하는데 필요한 기질을 선술이라 한다. 육문의 신공과 선술에 능통한 자를 신선이라 부른다. 각 육문이 관장하는 개념은 다음과 같다. 천문은 통제, 간문은 현실세계, 축문은 생명, 귀문은 비현실세계, 수문은 혼란, 옥문은 죽음.',
  },
  {
    title: '배경: 육문 2',
    content: '육문은 대립하는 세 쌍으로 나눌 수 있다. 천문과 수문, 간문과 귀문, 축문과 옥문이다. 육문이 나열된 순서에 따라서도 대립의 정도에 차이가 생긴다. 천문과 수문 사이에는 간, 축, 귀의 가장 큰 공백이 있어 매우 상극이다. 간문과 귀문 사이에는 축의 가장 작은 공백이 있어 어느정도 어우러진다. 축문과 옥문 사이에는 귀, 수의 중간 정도 공백이 있다. 인간계는 천, 간, 축이 주가 되는 세계이기 때문에 귀, 수, 옥이 희귀하며 어우러지기 어렵다. 특히 수문을 타고난 인간은 극히 드물고, 삶이 순탄치 않을 가능성이 높다.',
  },
  {
    title: '무공: 무당파',
    content: '1',
  },
  {
    title: '무공: 화산파',
    content: '1',
  },
  {
    title: '무공: 종남파',
    content: '1',
  },
  {
    title: '무공: 소림사',
    content: '1',
  },
  {
    title: '무공: 아미파',
    content: '1',
  },
  {
    title: '무공: 점창파',
    content: '1',
  },
  {
    title: '무공: 공동파',
    content: '1',
  },
  {
    title: '무공: 해남파',
    content: '1',
  },
  {
    title: '무공: 형산파',
    content: '1',
  },
  {
    title: '무공: 개방',
    content: '1',
  },
  {
    title: '조식: 외향식',
    content: '# 외향식
- 외적인 기능을 향상시키는 조식을 외향식이라 한다.
- 대표적인 외향식:
 - 탈이궁(脫痍躬): 뼈의 손상을 회복한다
 - 반배지(反倍肢): 사지의 근육을 강화한다
 - 남무선(濫武癬): 피부를 경화시켜 손상을 막는다
 - 자종매(自終埋): 부정한 기운을 뿜어내어 신체를 정갈히 한다',
  },
  {
    title: '조식: 내향식',
    content: '# 내향식
- 내적인 기능을 향상시키는 조식을 내향식이라 한다.
- 대표적인 내향식:
 - 신지가련(身之加鍊): 순간적으로 집중 상태에 돌입한다
 - 부륜주숙(腐輪珠淑): 신체의 흡수 기능을 강화한다
 - 불추쾌(拂抽快): 신경에 쌓인 피로를 씻는다
 - 암운보(暗雲寶): 매력, 정기, 활력을 증진시키며 잉태를 돕는다',
  },
  {
    title: '조식: 순향식',
    content: '# 순향식
- 순환적인 기능을 향상시키는 조식을 순향식이라 한다.
- 대표적인 순향식:
 - 작호루루(雀呼淚淚): 아침에 깬 듯 개운한 상태가 된다
 - 운기불치(運氣拂治): 호흡을 재정렬 하여 중심을 잡는다
 - 고나감선(苦裸感善): 피를 깨끗이 하여 활기를 찾는다
 - 타건지양(唾乾之陽): 태양의 기운으로 신체를 소독한다',
  },
  {
    title: '사술: ',
    content: '1',
  },
  {
    title: '사술: ',
    content: '1',
  },
  {
    title: '사술: ',
    content: '1',
  },
  {
    title: '마공: ',
    content: '1',
  },
  {
    title: '마공: ',
    content: '1',
  },
  {
    title: '마공: ',
    content: '1',
  },
  {
    title: '요술: ',
    content: '1',
  },
  {
    title: '요술: ',
    content: '1',
  },
  {
    title: '요술: ',
    content: '1',
  },
  {
    title: '신공: ',
    content: '1',
  },
  {
    title: '신공: ',
    content: '1',
  },
  {
    title: '신공: ',
    content: '1',
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
