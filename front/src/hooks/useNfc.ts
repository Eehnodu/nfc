"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface NfcEvent {
  type: "checkin" | "checkout" | "break_out" | "break_in";
  timestamp: Date;
  userId: string;
  userName: string;
}

export function useNfc() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processNfcTag = useCallback(
    async (nfcId: string) => {
      setIsProcessing(true);

      try {
        // Simulate NFC processing
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock response
        const event: NfcEvent = {
          type: "checkin",
          timestamp: new Date(),
          userId: "user1",
          userName: "홍길동",
        };

        // Show success feedback
        toast({
          title: "✅ 출근 처리 완료",
          description: `${event.userName}님, ${event.timestamp.toLocaleTimeString()} 출근되었습니다.`,
          duration: 3000,
        });

        // Play sound effect (if available)
        if ("vibrate" in navigator) {
          navigator.vibrate(200);
        }

        return event;
      } catch (error) {
        toast({
          title: "❌ 처리 실패",
          description: "NFC 태그 처리 중 오류가 발생했습니다.",
          variant: "destructive",
          duration: 3000,
        });
        throw error;
      } finally {
        setIsProcessing(false);
      }
    },
    [toast]
  );

  return {
    processNfcTag,
    isProcessing,
  };
}
