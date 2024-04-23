const LegalMoveIndicator = ({
    isPiece
  }: {
    isPiece: boolean;
  }) => {
    return (
      <div className="absolute z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {isPiece ? (
          <div
            className='w-[60px] h-[60px] border-[#C8CAB2] border-4 rounded-full'
          />
        ) : (
          <div
            className='w-5 h-5 bg-[#C8CAB2] rounded-full'
          />
        )}
      </div>
    );
  };
  
  export default LegalMoveIndicator;