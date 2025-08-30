import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const page = usePage();
  const { state } = useSidebar();

  return (
    <SidebarGroup className="scrollbar-hide overflow-y-auto px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="">
        <ScrollArea className="h-[calc(100vh-200px)]">
          {items.map((item) => {
            const isActive = item.href === page.url;
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            if (hasSubmenu) {
              // When sidebar is collapsed, show submenu on hover
              if (state === 'collapsed') {
                return (
                  <HoverCard key={item.title} openDelay={200} closeDelay={300}>
                    <HoverCardTrigger asChild>
                      <SidebarMenuItem className="relative">
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActive} 
                          tooltip={{ 
                            children: item.title,
                            side: "right",
                            sideOffset: 15
                          }}
                        >
                          <div className="flex w-full items-center gap-2 cursor-pointer relative group transition-all duration-200">
                            {item.icon && <item.icon className="transition-colors group-hover:text-primary" />}
                            <span className="sr-only">{item.title}</span>
                            <ChevronRight className="ml-auto h-3 w-3 opacity-60 group-hover:opacity-80 group-hover:text-primary transition-all duration-200" />
                            {/* Visual indicator for submenu */}
                            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:bg-primary group-hover:scale-110 transition-all duration-200" />
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </HoverCardTrigger>
                    <HoverCardContent 
                      side="right" 
                      align="start" 
                      className="w-80 p-0 shadow-xl border-l-4 border-l-primary animate-in slide-in-from-left-2 fade-in-0 duration-200"
                      sideOffset={15}
                    >
                      {/* Header */}
                      <div className="border-b border-border bg-gradient-to-r from-primary/8 to-primary/12 backdrop-blur-sm">
                        <div className="flex items-center gap-3 px-5 py-4">
                          {item.icon && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 text-primary">
                              <item.icon className="h-4 w-4" />
                            </div>
                          )}
                          <div className="flex-1">
                            <span className="font-semibold text-foreground text-base">{item.title}</span>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <span>{item.submenu?.length} items</span>
                              <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
                              <span>Navigate with ↑↓ keys</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Submenu Items */}
                      <div className="p-3 space-y-1 max-h-96 overflow-y-auto">
                        {item.submenu?.map((subItem) => {
                          const isSubActive = subItem.href === page.url;
                          return (
                            <Link 
                              key={subItem.title}
                              href={subItem.href ?? '#'} 
                              prefetch
                              className={`
                                flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
                                transition-all duration-200 ease-out
                                hover:bg-primary/12 hover:text-primary hover:translate-x-1 hover:shadow-sm
                                focus:bg-primary/12 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30
                                active:scale-[0.98] active:transition-transform active:duration-75
                                group/submenu-item
                                ${isSubActive 
                                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm' 
                                  : 'text-foreground hover:border hover:border-primary/20'
                                }
                              `}
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`
                                  w-2 h-2 rounded-full transition-all duration-200
                                  ${isSubActive 
                                    ? 'bg-primary animate-pulse shadow-sm' 
                                    : 'bg-current opacity-40 group-hover/submenu-item:opacity-80 group-hover/submenu-item:bg-primary'
                                  }
                                `} />
                                <span className="truncate leading-tight">{subItem.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {isSubActive && (
                                  <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                                )}
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover/submenu-item:opacity-60 transition-opacity" />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      
                      {/* Footer hint */}
                      <div className="border-t border-border bg-muted/30 px-4 py-2">
                        <div className="text-xs text-muted-foreground text-center">
                          Click to navigate • Esc to close
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                );
              }

              // When sidebar is expanded, show normal collapsible behavior
              return (
                <Collapsible key={item.title} asChild defaultOpen={isActive}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{ children: item.title }}>
                      <CollapsibleTrigger className="group">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </CollapsibleTrigger>
                    </SidebarMenuButton>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.submenu &&
                          item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={subItem.href === page.url}>
                                <Link href={subItem.href ?? '#'} prefetch>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive} 
                  tooltip={{ 
                    children: item.title,
                    side: "right",
                    sideOffset: state === 'collapsed' ? 15 : 5
                  }}
                >
                  <Link href={item.href ?? '#'} prefetch className="transition-colors hover:text-primary">
                    {item.icon && <item.icon className="transition-colors" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </ScrollArea>
      </SidebarMenu>
    </SidebarGroup>
  );
}
