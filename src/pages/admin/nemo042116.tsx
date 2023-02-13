import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import React from 'react';

const MustHaveToDO = () => {
  // 이미지로 교체 시급
  return (
    <>
      <HeadTitle title={'관리자페이지'} />
      <div>
        <button> 하루한번!</button>
      </div>
    </>
  );
};

export default MustHaveToDO;
