export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      career_nodes: {
        Row: {
          career_path_id: string
          created_at: string
          description: string | null
          difficulty: string | null
          estimated_hours: number | null
          id: string
          node_type: string
          parent_node_id: string | null
          position_x: number
          position_y: number
          priority: number
          requirements: string | null
          resources: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          career_path_id: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          estimated_hours?: number | null
          id?: string
          node_type?: string
          parent_node_id?: string | null
          position_x?: number
          position_y?: number
          priority?: number
          requirements?: string | null
          resources?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          career_path_id?: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          estimated_hours?: number | null
          id?: string
          node_type?: string
          parent_node_id?: string | null
          position_x?: number
          position_y?: number
          priority?: number
          requirements?: string | null
          resources?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_nodes_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "career_nodes_parent_node_id_fkey"
            columns: ["parent_node_id"]
            isOneToOne: false
            referencedRelation: "career_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      career_paths: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          employee_user_id: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          employee_user_id: string
          id?: string
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          employee_user_id?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      evaluation_parameters: {
        Row: {
          created_at: string
          created_by: string
          id: string
          max_score: number
          name: string
          program_id: string
          weight: number
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          max_score?: number
          name: string
          program_id: string
          weight?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          max_score?: number
          name?: string
          program_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_parameters_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "intern_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      intern_evaluations: {
        Row: {
          created_at: string
          evaluated_by: string
          evaluation_type: string
          id: string
          intern_user_id: string
          max_score: number
          notes: string | null
          parameter_id: string | null
          program_id: string
          score: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          evaluated_by: string
          evaluation_type?: string
          id?: string
          intern_user_id: string
          max_score?: number
          notes?: string | null
          parameter_id?: string | null
          program_id: string
          score?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          evaluated_by?: string
          evaluation_type?: string
          id?: string
          intern_user_id?: string
          max_score?: number
          notes?: string | null
          parameter_id?: string | null
          program_id?: string
          score?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "intern_evaluations_parameter_id_fkey"
            columns: ["parameter_id"]
            isOneToOne: false
            referencedRelation: "evaluation_parameters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intern_evaluations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "intern_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      intern_lessons: {
        Row: {
          content: string | null
          created_at: string
          created_by: string
          id: string
          lesson_type: string
          order_index: number
          program_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by: string
          id?: string
          lesson_type?: string
          order_index?: number
          program_id: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string
          id?: string
          lesson_type?: string
          order_index?: number
          program_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "intern_lessons_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "intern_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      intern_program_assignments: {
        Row: {
          assigned_by: string
          created_at: string
          id: string
          intern_user_id: string
          program_id: string
        }
        Insert: {
          assigned_by: string
          created_at?: string
          id?: string
          intern_user_id: string
          program_id: string
        }
        Update: {
          assigned_by?: string
          created_at?: string
          id?: string
          intern_user_id?: string
          program_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "intern_program_assignments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "intern_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      intern_programs: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_date: string | null
          id: string
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      procedures: {
        Row: {
          category: string | null
          content: string
          created_at: string
          created_by: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          created_by: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          department: string | null
          full_name: string
          id: string
          level: string | null
          manager_id: string | null
          phone: string | null
          position: string | null
          start_date: string | null
          target_role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          department?: string | null
          full_name?: string
          id?: string
          level?: string | null
          manager_id?: string | null
          phone?: string | null
          position?: string | null
          start_date?: string | null
          target_role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          department?: string | null
          full_name?: string
          id?: string
          level?: string | null
          manager_id?: string | null
          phone?: string | null
          position?: string | null
          start_date?: string | null
          target_role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_manager_of: {
        Args: { _employee_user_id: string; _manager_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "stajyer"
        | "personel"
        | "takim_lideri"
        | "yonetici"
        | "ust_yonetici"
        | "ik"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "stajyer",
        "personel",
        "takim_lideri",
        "yonetici",
        "ust_yonetici",
        "ik",
      ],
    },
  },
} as const
